import React from 'react';
import {fetchUserFollows} from "../../api/user.ts";
import {FollowsPage} from "../../api/type.ts";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import UserItem from "../../components/UserItem.tsx";

type FollowsLoaderParams = {
  un: string;
};

export async function getFollowsContent(un: string) {
  console.log('params', un);
  let content =  await fetchUserFollows(un, '1')
  if (content.total_follow_num !== 1) {
    const promises = [];
    for (let i = 2; i <= (content.total_follow_num/20+1); i++) {
      promises.push(fetchUserFollows(un, i.toString()));
    }
    const results = await Promise.all(promises);
    results.forEach(result => {
      content.follow_list.push(...result.follow_list);
    });
  }
  return content;
}

export async function FollowsLoader({params}:LoaderFunctionArgs<FollowsLoaderParams>): Promise<any> {
  console.log('params', params);
  let content  = await getFollowsContent(params.un as string);
  return [content, params.un];
}

interface FollowsCardProps {content: FollowsPage;}

const FollowsCard: React.FC<FollowsCardProps> = ({content}) => {
  console.log(content);
  if (content.total_follow_num == 0) {
    return <div>(仅展示登录用户和正常账号)</div>;
  }
  return content.follow_list.map((item) => {
    return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={item.id}/>;
  });
}


function FollowsContent() {
  const [content, un ] = useLoaderData() as [FollowsPage, string];
  return (
    <div>
      <h2>
        <div className="flex items-end gap-x-2">关注列表
          <span className="text-default text-base">(按最新关注排序)</span>
        </div>
      </h2>
      <p>{un}共有{content.total_follow_num}个关注对象。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start p-6 md:mx-1">
        <FollowsCard content={content} />
      </div>
    </div>
  );
}

export default FollowsContent;