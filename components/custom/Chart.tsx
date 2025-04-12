import React from "react";
import ReactEcharts from "echarts-for-react";
import type { EChartsReactProps } from "echarts-for-react";
import type { EChartsOption } from "echarts";
import styles from "./BaPieChart.module.css";
import { UserPost } from "@/utils/types";
import { useWindowSize } from "@/utils/hooks";

interface BaChartData {
  name: string;
  value: number;
}

export interface clickEvent {
  componentType: string;
  componentSubType: string;
  componentIndex: number;
  seriesType: string;
  seriesIndex: number;
  seriesId: string;
  seriesName: string;
  name: string;
  dataIndex: number;
  data: {
    name: string;
    value: number;
  };
  event: MouseEvent;
  value: number;
  color: string;
  dimensionNames: string[];
  encode: {
    value: number[];
  };
  $vars: string[];
  percent: number;
  type: string;
}

interface BaChartProps extends Omit<EChartsReactProps, "option"> {
  data: BaChartData[];
}

function BaChart(props: BaChartProps) {
  const getOption = () => {
    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    } satisfies EChartsOption;
    return option;
  };

  return (
    <ReactEcharts
      className={styles.Comp}
      option={getOption()}
      {...props}
    />
  );
}

function ScatterChart(
  props: Omit<EChartsReactProps, "option"> & { data: Array<[Date, number]> }
) {
  const yearNow = new Date().getFullYear();
  const option = {
    backgroundColor: "transparent",
    xAxis: {
      type: "time",
      name: "日期",
      nameLocation: "middle",
      min: new Date(yearNow, 0, 1, 0, 0),
      max: new Date(yearNow + 1, 0, 1, 0, 0),
      axisLabel: {
        formatter: "{MMM}",
      },
    },
    yAxis: {
      name: "小时",

      min: 0,
      max: 24,
    },
    series: [
      {
        symbolSize: 10,
        data: props.data,
        type: "scatter",
      },
    ],
  } satisfies EChartsOption;

  return <ReactEcharts className={styles.Comp} option={option} {...props} />;
}

interface SankeyChartProps extends Omit<EChartsReactProps, "option"> {
  data: {
    nodes: { name: string }[];
    links: { source: string; target: string; value: number }[];
  };
}

export function SankeyChart(props: SankeyChartProps) {
  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "sankey",
        data: props.data.nodes,
        links: props.data.links,
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          curveness: 0.5,
        },
      },
    ],
  } satisfies EChartsOption;

  return <ReactEcharts className={styles.Comp} option={option} {...props} />;
}

export { BaChart, ScatterChart };
