import {
  Area,
  AreaChart,
  AreaSeries,
  BubbleChart,
  BubbleLabel,
  BubbleSeries,
  Gradient,
  GradientStop, Line, PieArcSeries, PieChart,
  Stripes
} from "reaviz";
import {splitTimestamps, transformCounter} from "@/utils/tools";
import React from "react";
import {BasicCounter, Counter} from "@/utils/type";


export const EmotionBubbleChart: React.FC<{ result: BasicCounter }> = ({result}): React.ReactNode => {
  return (
    <div className="grid grid-cols-2 gap-2 mx-auto py-6 w-full">
      <div>
        <h3 className="text-center">emoji气泡图</h3>
        {Object.keys(result.emojicounter).length !== 0 &&
          <BubbleChart data={transformCounter(result.emojicounter)} height={350} width={350}
                       className="text-2xl" id="BubbleChart"
                       series={<BubbleSeries colorScheme="cybertron" label={
                         <BubbleLabel fontSize={26}/>}/>}
          />
        }
      </div>

      <div>
        <h3 className="text-center">贴吧表情气泡图</h3>
        {Object.keys(result.emoticonCounter).length !== 0 &&
          <BubbleChart data={transformCounter(result.emoticonCounter)} height={350} width={350}
                       id="BubbleChart"
                       series={<BubbleSeries colorScheme="cybertron" label={
                         <BubbleLabel fill="#fde68a"
                                      format={item => {
                                       let key = item.data.key;
                                       let size = Math.min(40, Math.max(result.emoticonCounter[key] * 5, 16));
                                       return <g>
                                         <foreignObject height={size} width={size}
                                                        x={-size / 2} y={-(size * 1.25) / 2}
                                                        className="relative">
                                           <img src={`/emoticon4tieba/${key}.png`} width={40}
                                                height={40} alt={key}
                                                className="absolute inset-0"
                                           />
                                         </foreignObject>
                                         <text dy={35} fill="white" textAnchor="middle"
                                               className="text-sm text-amber-200">
                                           {key}
                                         </text>
                                       </g>;
                                     }}/>}/>
                      }
        />}
      </div>
    </div>
  )
}

export const TimeTrendChart: React.FC<{ timeLine: number[] }> = ({timeLine}): React.ReactNode => {
  return (
    <div>
      <h3 className="text-center pb-5">发帖量时间趋势图</h3>
      <AreaChart width={430} height={150} data={splitTimestamps(timeLine)}
                 className="my-auto mx-0"

                 series={<AreaSeries interpolation="smooth"
                                     area={<Area mask={<Stripes/>}
                                                 gradient={
                                                   <Gradient stops={
                                                     [<GradientStop offset="0%" stopOpacity={.2} key={1}/>,
                                                       <GradientStop offset="50%" stopOpacity={1} key={2}/>]
                                                   }/>}
                                     />}
                                     line={<Line strokeWidth={3}/>}
                 />}
      />

    </div>
  )
}

export const DistributionPieChart: React.FC<{ data: Counter, title: string }> = ({data, title}): React.ReactNode => {

  return (
    <div>
      <h3 className="text-center">{title}</h3>
      <PieChart width={350} height={250} data={transformCounter(data)}
                series={<PieArcSeries cornerRadius={4} padAngle={0.02} padRadius={200} doughnut={true}
                                    colorScheme="cybertron"/>}/>
  </div>
)}


