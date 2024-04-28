"use client";

import china from '@/utils/China.json';
import * as echarts from 'echarts'; //全局引入 ，可按需引入
import { useEffect, useRef } from 'react';

const Map = (props:any) => {
  const chartRef = useRef(null);
  const topNumber = props.data[0].value;
  const bottomNumber = props.data[props.data.length - 1].value;

  const echartsMapClick = () => {
    //点击地图模块逻辑事件
  };

  const mapOption = (mapName:any, data:any) => {
    const myChart = echarts.init(chartRef.current);

    echarts.registerMap(mapName, data);
    const option = {
      tooltip: {
        backgroundColor: 'rgba(21, 24, 45, 0.9)', // 提示框浮层的背景颜色。
        textStyle: {
          // 提示框浮层的文本样式。
          color: '#fff',
          fontSize: 14,
        },
        extraCssText: 'border-color: rgba(21, 24, 45, 0.9);',
        formatter: function (params:any) {
          //数据格式化
          const val = params.value ? params.value : 0;
          if (params.value) {
            return (
              params.name + '<br />' + params.seriesName + '：' + val + '次'
            );
          } else {
            return '暂无数据';
          }
        },
      },
      visualMap: {
        min: 0,
        max: topNumber,
        left: 'left',
        top: 'bottom',
        text: [topNumber + '次', bottomNumber + '次'], //取值范围的文字
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        },
        show: true, //图注
      },
      geo: {
        map: 'china',
        roam: false, //不开启缩放和平移
        zoom: 1.23, //视角缩放比例
        label: {
          show: true,
          fontSize: '12',
          color: 'rgba(0,0,0,0.7)',
        },
        emphasis: {
          areaColor: '#a855f7', //鼠标选择区域颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 1)',
          },
        },

      },
      series: [
        {
          name:'发言数',
          type: 'map',
          geoIndex: 0,
          data: props.data,
        },
      ],
    };
    myChart.setOption(option); //绘图
    //点击画布内还是画布外
    myChart.getZr().on('click', (params) => {
      if (params.target) {
        myChart.on('click', echartsMapClick); //增加点击事件
      }
    });
  };
  const loadingChina = () => {
    mapOption('china', china); //初始化-创建中国地图
  };

  useEffect(() => {
    loadingChina();
  }, [props.data]);

  return <div style={{ width: '100%', minHeight: '500px' }} ref={chartRef} />;
};
export default Map;