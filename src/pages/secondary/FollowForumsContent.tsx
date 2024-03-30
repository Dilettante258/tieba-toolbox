import React from 'react';
import {fetchUserFollowForums} from "../../api/user.ts";
import {followForumDetail} from "../../api/type.ts";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";

type FollowForumsLoaderParams = {
  un: string;
};

export async function getFollowForumsContent(un: string) {
  console.log('params', un);
  let content =  await fetchUserFollowForums(un, '1')
  if (content.has_more !== "0") {
    let temp = await fetchUserFollowForums(un, "2");
    content.forum_list["non-gconforum"].push(...temp.forum_list["non-gconforum"]);
    content.forum_list.gconforum.push(...temp.forum_list.gconforum);
  }

  let combinedForums = content.forum_list["non-gconforum"].concat(content.forum_list.gconforum);
  console.log(combinedForums);
  return combinedForums;
}

export async function FollowForumsLoader({params}:LoaderFunctionArgs<FollowForumsLoaderParams>): Promise<any> {
  console.log('params', params);
  let content  = await getFollowForumsContent(params.un as string);
  return [content, params.un];
}

interface FollowForumsCardProps {content: Array<followForumDetail>;}

const FollowForumsCard: React.FC<FollowForumsCardProps> = ({content}) => {
  return content.map((item) => {
    return (
      <div key={item.id} className="flex flex-row gap-x-3 items-center">
        <div className="align-items">
          <img src={item.avatar} alt={item.name}
               className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-2 ring-default-300 dark:ring-purple-600 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900"/>
        </div>
        <div>
          <a href={`https://tieba.baidu.com/f?kw=${item.name}`} target="_blank">{item.name}</a>
          <p className="text-default-400 text-base">等级：{item.level_id} {item.level_name}</p>
          <p className="text-default text-sm">{item.cur_score}/{item.levelup_score}</p>
        </div>
      </div>
    );
  });
}


function FollowForumsContent() {
  const [content, un] = useLoaderData() as [Array<followForumDetail>, string];
  return (
    <div>
      <h2>
        <div className="flex items-end gap-x-2">关注贴吧列表
          <span className="text-default text-base">(按等级排序)</span>
        </div>
      </h2>
      <p>{un}关注了{content.length}个吧。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        <FollowForumsCard content={content} />
      </div>
    </div>
  );
}

export default FollowForumsContent;