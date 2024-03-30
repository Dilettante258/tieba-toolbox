import React from 'react';
import {fetchUserFans} from "../../api/user.ts";
import {FansPage} from "../../api/type.ts";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import UserItem from "../../components/UserItem.tsx";

type FansLoaderParams = {
  un: string;
};

export async function getFansContent(un: string) {
  console.log('params', un);
  let content =  await fetchUserFans(un, '1')
  console.log(content.page.total_count);
  if (content.page.total_page !== '1') {
    for (let i = 2; i <= Number(content.page.total_page); i++) {
      let temp = await fetchUserFans(un, i.toString());
      content.user_list.push(...temp.user_list);
    }
  }
  console.log(content);
  return content;
}





export async function FansLoader({params}:LoaderFunctionArgs<FansLoaderParams>): Promise<any> {
  console.log('params', params);
  let content  = await getFansContent(params.un as string);
  return [content, params.un];
}


interface FansCardProps {content: FansPage;}

const FansCard: React.FC<FansCardProps> = ({content}) => {
  if (content.user_list.length == 0) {
    return <div>(仅展示登录用户和正常账号)</div>;
  }
  return content.user_list.map((item) => {
      return <UserItem un={item.name} name_show={item.name_show} avatar={item.portrait} key={item.id}/>;
  });
}


function FansContent() {
  const [content,un ] = useLoaderData() as [FansPage, string];
  return (
    <div>
      <h2>
        <div className="flex items-end gap-x-2">粉丝列表
          <span className="text-default text-base">(按最新关注排序)</span>
        </div>
      </h2>
      <p>{un}共有{content.page.total_count}个粉丝。</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-start md:p-6 px-1 py-4">
        <FansCard content={content} />
      </div>
    </div>
  );
}

export default FansContent;