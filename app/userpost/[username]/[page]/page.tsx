"use client"

import {Button, ButtonGroup, Chip} from "@nextui-org/react";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";

import {useUid, useUserPost} from "@/utils/useSWR";
import Loading from "@/app/loading";
import { useRouter } from 'next/navigation'


const PostList: React.FC<{uid:number,page:number,username:string}> = ({uid,page,username}): React.ReactElement => {
  const {data, isLoading,isError } = useUserPost(uid,page);
  const router = useRouter()
  if (isLoading) return <Loading />
  if (isError) return (
    <article className="p-4 mx-auto">
      没有找到相关内容，有以下几种可能：
      <ul>
        <li>该用户隐藏了自己帖子</li>
        <li>您的输入有误</li>
        <li>该用户没有发过帖子</li>
        <li>请求的页数已经没有内容了</li>
      </ul>
    </article>
  )
  return (
    <>
      <div className="text-center p-2">
        当前第{page}页
      </div>
      <div className="rid grid-cols-1 divide-y divide-gray-400 w-full" id="postContent">
        {data.result.map((post, index) => (
          <div key={index} className="py-2">
            <p className="text-base">
              在
              <a href={`https://tieba.baidu.com/f?kw=${post.forumName}`}
                 target="_blank"
              >
                {post.forumName}吧
              </a>
              回复{" "}
              <a
                href={`https://tieba.baidu.com/p/${post.threadId}`}
                target="_blank"
                rel="bookmark"
              >{post.title}
              </a>：</p>
            <p className="text-lg">
              {post.replyTo ? <>回复<a>{post.replyTo}</a>：</> : ""}{post.content}
            </p>
            <div className="grid grid-cols-2">

              <div>{post.affiliated ? <Chip color="default" size="sm">楼中楼</Chip> : ""}</div>
              <div className="text-medium justify-self-end flex flex-row w-[170px]">
                <a
                  href={`https://tieba.baidu.com/p/${post.threadId}?fid=${post.forumId}&pid=${post.postId}&cid=0#${post.cid}`}
                  target="_blank"
                  className="justify-self-start"
                >
                  链接
                </a>
                <span className="text-right text-slate-500 grow">
                  {post.createTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-2 pb-4">
        <ButtonGroup>
          <Button color="primary"
                  onClick={() => {
                    router.push(`/userpost/${username}/${Number(page)-1}`);
                  }}
                  isDisabled={page === 1}
                  startContent={<CaretLeft/>}
          >
            上一页
          </Button>
          <Button color="primary"
                  onClick={() => {
                    router.push(`/userpost/${username}/${Number(page)+1}`);
                  }}
                  endContent={<CaretRight/>}
          >
            下一页
          </Button>
        </ButtonGroup>
      </div>
    </>

  );
};

export default function Page({params: {username, page}}: {
  params: {
    username: string
    page: number
  }
}) {
  const {data, isLoading, isError} = useUid(username);
  if (isError) return (
    <article className="p-4 mx-auto">
      找不到该用户，可能输入有误
    </article>
  )

  if (isLoading) return <Loading />

  return (
    <>
      <PostList uid={data.id} page={page} username={username}/>
    </>
  )
}