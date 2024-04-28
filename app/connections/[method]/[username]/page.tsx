"use client"


import {useUserFans, useUserFollows, useUserRelated} from "@/utils/useSWR";
import Loading from "@/app/loading";
import UserItem from "@/components/UserItem";
import {methodDict} from "@/utils/type";
import {getUserId} from "@/utils/cache";
import {useEffect, useState} from "react";


const FansUserList: React.FC<{uid:number,username:string}> = ({uid,username}): React.ReactNode => {
  const {data, isLoading,isError } = useUserFans(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.user_list.length == 0) {
    return <div>(仅展示登录用户和正常账号)</div>;
  }
  console.log(data);
  return (
    <>
      <p>{username}共有{data.user_list.length}个粉丝，其中{data.page.total_count}个登录用户和正常账号。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        {data.user_list.map((item, index) => {
          return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={index}/>;
        })}
      </div>
    </>
  );
};

const FollowsUserList: React.FC<{uid:number,username:string}> = ({uid,username}): React.ReactNode => {
  const {data, isLoading,isError } = useUserFollows(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.total_follow_num == 0) {
    return <div>(仅展示登录用户和正常账号)</div>;
  }
  return (
    <>
      <p>{username}关注了{data.follow_list.length}个用户，其中{data.total_follow_num}个登录用户和正常账号。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        {data.follow_list.map((item, index) => {
          return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={index}/>;
        })}
      </div>
    </>
  );
};

const RelatedUserList: React.FC<{uid:number,username:string}> = ({uid,username}): React.ReactNode => {
  const {data, isLoading,isError } = useUserRelated(uid);
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      好像出现了一些问题，请联系管理员。
    </article>
  )
  if (data.user_list.length == 0) {
    return <div>似乎没有数据，请设置BDUSS。(仅展示登录用户和正常账号)</div>;
  }
  return (
    <>
      <p>{username}的{data.user_list.length}个粉丝中，有{data.statistics.friend}个是你的互关，
        有{data.statistics.fans}个你的粉丝。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        {data.user_list.map((item, index) => {
          return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={index}/>;
        })}
      </div>
    </>
  );
};

export default function Page({params: {method, username}}: {
  params: {
    method: string
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
    <div className="flex flex-col h-full">
      <h2>
        <div className="flex items-end gap-x-2">{methodDict[method]}列表
          <span className="text-default text-base">(按最新关注排序)</span>
        </div>
      </h2>
      {method == 'fans' && <FansUserList uid={uid} username={username}/>}
      {method == 'follows' && <FollowsUserList uid={uid} username={username}/>}
      {method == 'related' && <RelatedUserList uid={uid} username={username}/>}
    </div>
  )
}