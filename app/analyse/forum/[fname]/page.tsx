"use client";

import Map from "@/components/Map";
import {useForumThreadCut} from "@/utils/useSWR";
import Loading from "@/app/loading";
import {convertCount} from "@/utils/tools";

import React, {useState} from "react";
import ReactWordcloud, {Word} from "@cyberblast/react-wordcloud";
import {DistributionPieChart, EmotionBubbleChart, TimeTrendChart} from "@/components/Statistics";


const PostsWordCloud: React.FC<{fname:string}> = ({fname}): React.ReactNode => {
  const {data, isLoading, isError} = useForumThreadCut(fname);

  const [wordsCounts, setWordsCounts] = useState<Word[] | null>(null);


  if (isLoading) return <></>
  if (isError) return (
    <></>
  )

  if (!wordsCounts) {
    setWordsCounts(convertCount(data.cutResult));
  }

  if (wordsCounts) return (
    <div className="ring-2 rounded-3xl md:w-[600px] md:h-[350px] mx-auto p-4 my-2 relative w-full h-[332px]">
      <h3 className="absolute ">回复贴词云</h3>
      <ReactWordcloud
        maxWords={150}
        options={{
          fontSizes: [12, 80],
          rotations: 0
        }}
        size={[(window.innerWidth > 600 ? 600 : 400) - 32, (window.innerWidth > 600 ? 350 : 200) - 32]}
        words={wordsCounts}
      />
    </div>
  )
};


const ThreadMap: React.FC<{ fname: string }> = ({fname}): React.ReactNode => {
  const {data, isLoading, isError} = useForumThreadCut(fname);
  if (isLoading) return <Loading/>
  console.log(data);

  if (!data?.counter?.timeLine) return (
    <article className="p-4 mx-auto">
      没有数据。输入的需要是吧名。请检查输入是否正确。
    </article>
  )

  return (
    <>
      <div className="mx-auto my-2 flex flex-row pt-3">
        <TimeTrendChart timeLine={data.counter.timeLine}/>
        <DistributionPieChart title={'发言用户等级分布饼状图'} data={data.counter.userAttributesCount.levelId}/>
      </div>
      <h3 className="text-center">发言用户IP分布图</h3>
      <Map data={data.counter.userAttributesCount.ipAddress} height/>
      <EmotionBubbleChart result={data.counter}/>
    </>
  );
};

export default function Page({params: {fname}}: {
  params: {
    fname: string
  }
}) {
  return (
    <>
      <ThreadMap fname={fname}/>
      <PostsWordCloud fname={fname}/>
    </>
  )
}
