import React from 'react';
import {fetchUserFans} from "../../api/user.ts";
import {FansPage} from "../../api/type.ts";
import {LoaderFunctionArgs, redirect, useLoaderData} from "react-router-dom";
import UserItem from "../../components/UserItem.tsx";

type FansLoaderParams = {
  un: string;
};

export async function searchFriendsAction({ request }:{ request: Request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (!updates.un) {
    return;
  }
  let encodeun = encodeURIComponent(updates.un as string);
  return redirect(`/friends/${encodeun}`);
}

export async function getFansContent(un: string) {
  console.log('params', un);
  let content =  await fetchUserFans(un, '1')
  console.log(content.page.total_count);
  let mutualFollowsCount = content.user_list.filter(user => user.is_friend === '1').length;
  if (content.page.total_page !== '1') {
    for (let i = 2; i <= Number(content.page.total_page); i++) {
      let temp = await fetchUserFans(un, i.toString());
      content.user_list.push(...temp.user_list);
      mutualFollowsCount += temp.user_list.filter(user => user.is_friend === '1').length;
    }
  }
  console.log(content);
  return {content, mutualFollowsCount};
}

export async function FriendsLoader({params}:LoaderFunctionArgs<FansLoaderParams>): Promise<any> {
  console.log('params', params);
  let {content, mutualFollowsCount}  = await getFansContent(params.un as string);
  return [content, mutualFollowsCount, params.un];
}


interface FriendsCardProps {content: FansPage;}

const FriendsCard: React.FC<FriendsCardProps> = ({content}) => {
  return content.user_list.map((item) => {
    if (item.is_friend !== '0') {
      return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={item.id}/>;
    }
  });
}


function FriendsContent() {
  const [content,mutualFollowsCount, un ] = useLoaderData() as [FansPage, number, string];
  return (
    <div>
      <h2>
        <div className="flex items-end gap-x-2">互关列表
          <span className="text-default text-base">(按最新关注排序)</span>
        </div>
      </h2>
      <p>{un}共有{mutualFollowsCount}个互关对象。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        <FriendsCard content={content} />
      </div>
    </div>
  );
}

export default FriendsContent;