"use client";

import {useLikeForums, useUid} from "@/utils/useSWR";
import Loading from "@/app/loading";
import {Button} from "@nextui-org/react";


const TryAgain = () => (
  <div className="my-auto mx-1/3">
    <p>服务器没有返回数据，这可能有一些问题，不过目前我并不知道是接口哪里出了问题。可能是因为用户设置了隐藏？</p>
    <div>不二贴吧工具箱应该用了其他接口。待研究中！</div>
    <Button type="reset">重试</Button>
  </div>
)

const LikeForumLists: React.FC<{ uid: number }> = ({uid}): React.ReactNode => {
  const {data, isLoading, isError } = useLikeForums(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.length == 0) {
    return <TryAgain />
  }
  return (
    <>
      <p>关注了{data.length}个吧。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        {data.map((item) => {
          if (item == undefined) {
            return null;
          }
          return (
            <div key={item.id} className="flex flex-row gap-x-3 items-center">
              <div className="align-items">
                <img src={item?.avatar ? (item.avatar.includes('tiebapic')? item.avatar.slice(26):item.avatar) : './banned_forum.jpg'} alt={item.name} crossOrigin="anonymous"
                       className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-2 ring-default-300 dark:ring-purple-600 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900"/>
              </div>
              <div>
                <a href={`https://tieba.baidu.com/f?kw=${item.name}`} target="_blank">{item.name}</a>
                <p className="text-default-400 text-base">等级：{item.level_id} {item.level_name}</p>
                <p className="text-default text-sm">{item.cur_score}/{item.levelup_score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default function Page({params: {username}}: {
  params: {
    username: string
  }
}) {
  const {data, isLoading, isError} = useUid(username);

  username = decodeURI(username);

  if (isError) return (
    <article className="p-4 mx-auto">
      找不到用户{username}，可能输入有误。
    </article>
  )

  if (isLoading) return <Loading/>

  return (
    <div>
      <h2>
        <div className="flex items-end gap-x-2">关注贴吧列表
          <span className="text-default text-base">(按等级排序)</span>
        </div>
      </h2>
      <LikeForumLists uid={data.id} />
    </div>
  )
}