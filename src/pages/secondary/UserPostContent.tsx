import {Button, ButtonGroup, Chip} from "@nextui-org/react";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import React from "react";
import {compactPost} from "../../api/type.ts";


import {LoaderFunctionArgs, useLoaderData, useNavigate} from "react-router-dom";
import getPost from "../../api/post.ts";

type LoaderParams = {
  un: string;
  page: string;
};

export async function getUserPostContent(un: string, page: string) {
  console.log('params', un, page);
  let content =  await getPost(un, Number(page)).then( (res:any) => {
    return PostList({posts: res}) as Array<React.ReactElement>;
  })
  return content;
}

export async function UPCLoader({params}:LoaderFunctionArgs<LoaderParams>): Promise<any> {
  console.log('params', params);
  let content = await getUserPostContent(params.un as string, params.page as string);
  return [content,params.un,params.page];
}

const getThreadUrl = (threadId: number) => `https://tieba.baidu.com/p/${threadId}`;
const getForumUrl = (forumName: string) => `https://tieba.baidu.com/f?kw=${forumName}`;
const getPostUrl = (post:compactPost) =>
  `https://tieba.baidu.com/p/${post.threadId}?fid=${post.forumId}&pid=${post.postId}&cid=0#${post.cid}`;

const PostList: React.FC<{posts: compactPost[]}> = ({ posts }): Array<React.ReactElement> => {
  return posts.map((post, index) => (
    <div key={index} className="py-2">
      <p className="text-base">
        在
        <a href={getForumUrl(post.forumName)}
           target="_blank"
        >
          {post.forumName}吧
        </a>
        回复{" "}
        <a
          href={getThreadUrl(post.threadId)}
          target="_blank"
          rel="bookmark"
        >{post.title}
        </a>：</p>
      <p className="text-lg">
        {post.replyTo ? <>回复<a>{post.replyTo}</a>：</>:""}{post.content}
      </p>
      <div className="grid grid-cols-2">

        <div>{post.affiliated?<Chip color="default" size="sm">楼中楼</Chip>:""}</div>
        <div className="text-medium text-slate-500 text-right">
          <a href={getPostUrl(post)} target="_blank" className="">
            链接
          </a>{" "}{" "}{post.createTime}
        </div>
      </div>

    </div>
  ));
};

export default function UserPostContent() {
  const [content,un,page ] = useLoaderData() as [Array<React.ReactElement>,string,string];
  let page_ = Number(page);
  // console.log(content,un);
  const navigate=useNavigate()
  return (
    <>
      <div className="rid grid-cols-1 divide-y divide-gray-400" id="postContent">
        {content}
      </div>
      {(content) &&
        <div className="text-center p-2 pb-4">
          <ButtonGroup>
            <Button color="primary"
                    onClick={() => {
                      navigate(`/userpost/${un}/${page_-1}`);scrollTo({ top: 0, behavior: "smooth" })}}
                    isDisabled={page==='1'}
                    startContent={<CaretLeft/>}
            >
              上一页
            </Button>
            <Button color="primary"
                    onClick={() => {
                      navigate(`/userpost/${un}/${page_+1}`);scrollTo({ top: 0, behavior: "smooth" })}}
                    endContent={<CaretRight/>}
            >
              下一页
            </Button>
          </ButtonGroup>
        </div>
      }
    </>
  )
}


