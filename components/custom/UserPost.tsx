import {UserPost} from "@utils/types";
import './UserPost.css'
import {AlignVerticalSpaceAround} from "lucide-react";
import {RequestProps} from "@/app/userpost/[method]/[id]/[page]/page";

async function getUserPost({method,id,page}: RequestProps) {
  const res = await fetch(`http://localhost:3001/user/posts?${method}=${id}&page=${page}`)
  return res.json()
}


export default async function UserPostList({method,id,page}: RequestProps) {
  const data = await getUserPost({method,id,page});
  if(data.error) return <div>{data.error}</div>

  if (data)
  return (
    <div className="post-container">
      {data.map((post: UserPost, index: number) => (
        <div key={index} className="post">
          <p className="post-info">
            在
            <a href={`https://tieba.baidu.com/f?kw=${post.forumName}`}
               target="_blank"
               className='forum-name link'
            >
              {post.forumName}吧
            </a>
            回复
            <a
              href={`https://tieba.baidu.com/p/${post.threadId}`}
              target="_blank"
              className="post-title link"
              rel="bookmark"
            >{post.title}
            </a>：</p>
          <p className="post-content">
            {post.replyTo ? <>回复<a className='link'>{post.replyTo}</a>：</> : ""}
            {post.content}
          </p>
          <div className="grid grid-cols-2">
            <div>{post.affiliated ?
              <div className='tag'><AlignVerticalSpaceAround
                className="w-4 h-4 flex-shrink-0"/><p>楼中楼</p></div>
              : ""}</div>

            <div className="text-medium justify-self-end flex flex-row w-[170px]">
              <a
                href={`https://tieba.baidu.com/p/${post.threadId}?fid=${post.forumId}&pid=${post.cid}&cid=${post.cid}#${post.cid}`}
                target="_blank"
                className="justify-self-start link"
              >
                链接
              </a>
              <span className="post-time">
                  {post.createTime}
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

