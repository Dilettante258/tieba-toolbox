"use client";

import Map from "@/components/Map";
import {usePost} from "@/utils/useSWR";
import Loading from "@/app/loading";
import {convertCount, CountWords,} from "@/utils/tools";

import React, {useState} from "react";
import ReactWordcloud, {Word} from "@cyberblast/react-wordcloud";
import {DistributionPieChart, EmotionBubbleChart, TimeTrendChart} from "@/components/Statistics";


const PostsWordCloud: React.FC<{tid:string}> = ({tid}): React.ReactNode => {
  const {data, isLoading, isError} = usePost(tid);

  const [wordsCounts, setWordsCounts] = useState<Word[] | null>(null);


  if (isLoading) return <></>
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )

  if (!wordsCounts) {
    console.log(data.result.contentList);
    CountWords(data.result.contentList)
      .then(data => convertCount(data))
      .then((res) => {
        setWordsCounts(res);
      })
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


const PostMap: React.FC<{ tid: string }> = ({tid}): React.ReactNode => {
  const {data, isLoading, isError} = usePost(tid);
  if (isLoading) return <Loading/>
  console.log(data);

  return (
    <>
      <div className="mx-auto my-2 flex flex-row pt-3">
        <TimeTrendChart timeLine={data.result.timeLine}/>
        <DistributionPieChart title={'发帖用户等级分布饼状图'} data={data.result.userAttributesCount.levelId}/>
      </div>
      <h3 className="text-center">发言IP分布图</h3>
      <Map data={data.result.userAttributesCount.ipAddress} height/>
      <EmotionBubbleChart result={data.result}/>
    </>
  );
};

export default function Page({params: {tid}}: {
  params: {
    tid: string
  }
}) {
  return (
    <>
      <PostMap tid={tid}/>
      <PostsWordCloud tid={tid}/>
    </>
  )
}
