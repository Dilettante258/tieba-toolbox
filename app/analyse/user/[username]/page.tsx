"use client";

import ReactWordcloud from '@cyberblast/react-wordcloud';
import {useCutPost, useSimplePost} from "@/utils/useSWR";
import Loading from "@/app/loading";
import {Button} from "@nextui-org/react";
import {countForumOccurrences, transformData} from "@/utils/tools";
import {CalendarHeatmap} from "reaviz";
import {useEffect, useState} from "react";
import {getUserId} from "@/utils/cache";


const TryAgain = () => (
  <div className="my-auto mx-1/3">
    <p>重试一下吧！</p>
    <p>也许用户是隐藏了自己的发言。</p>
    <Button type="reset">重试</Button>
  </div>
)

const PostsWordCloud: React.FC<{ uid: number }> = ({uid}): React.ReactNode => {
  const {data, isLoading, isError } = useCutPost(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.result.length == 0) {
    return <TryAgain />
  }
  return (
    <ReactWordcloud
      maxWords={150}
      options={{
        fontSizes: [12, 80],
        rotations: 0
      }}
      size={[(window.innerWidth > 600 ? 600 : 400)-32, (window.innerWidth > 600 ? 350 : 200)-32]}
      words={data.result}
    />
  );
};

const ForumsWordCloud: React.FC<{uid:number}> = ({uid}): React.ReactNode => {
  const {data, isLoading,isError } = useSimplePost(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto my-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.result.length == 0) {
    return <TryAgain />
  }
  const forumCount = countForumOccurrences(data);
  return (
    <ReactWordcloud
      maxWords={100}
      options={{
        fontSizes: [20, 80],
        rotations: 0
      }}
      size={[(window.innerWidth > 600 ? 600 : 400)-32, (window.innerWidth > 600 ? 350 : 200)-32]}
      words={forumCount}
    />
  );
};

const PostHeatmap: React.FC<{uid:number}> = ({uid}): React.ReactNode => {
  const {data, isLoading,isError } = useSimplePost(uid);

  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.result.length == 0) {
    return <TryAgain />
  }

  console.log(data);
  let chartData = transformData(data);
  console.log(chartData);

  return (
    <CalendarHeatmap height={115} width={715} data={chartData} className="max-w-full "/>
  );
};



export default function Page({params: {username}}: {
  params: {
    username: string
  }
}) {
  const [uid, setUid] = useState(0);

  useEffect(() => {
    localStorage.setItem('username', username);
    getUserId(username).then((id) => {
      setUid(id);
    });
  }, []);

  username = decodeURI(username);

  if (uid==0) return (
    <article className="p-4 mx-auto">
      找不到用户{username}，可能输入有误。
    </article>
  )

  return (
    <>
      <div className="p-2 text-center text-default">{username}的数据</div>
      <div className="ring-2 rounded-3xl md:w-[747px] h-[179px] mx-auto p-4 my-2 w-full relative overflow-x-auto overflow-y-hidden">
        <h3 className="">发帖热力图</h3>
        <PostHeatmap uid={uid}/>
      </div>
      <div className="ring-2 rounded-3xl md:w-[600px] md:h-[350px] mx-auto p-4 my-2 relative w-full h-[332px]">
        <h3 className="absolute">回复贴词云</h3>
        <PostsWordCloud uid={uid}/>
      </div>
      <div className="ring-2 rounded-3xl md:w-[600px] md:h-[350px] mx-auto p-4 my-2 relative w-full h-[332px]">
        <h3 className="absolute">贴吧词云</h3>
        <ForumsWordCloud uid={uid}/>
      </div>
    </>
  )
}