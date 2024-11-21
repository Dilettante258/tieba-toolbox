
'use client'

import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import {userPostsOptions} from "@utils/user";
import {UserPost} from "@utils/types";



export default function UserPostList() {
  const { data } = useSuspenseQuery(userPostsOptions)
  return (
    <>
      {data.map((post: UserPost, index: number) => (
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

            <div>{post.affiliated ? <p color="default" size="sm">楼中楼</p> : ""}</div>
            <div className="text-medium justify-self-end flex flex-row w-[170px]">
              <a
                href={`https://tieba.baidu.com/p/${post.threadId}?fid=${post.forumId}&pid=${post.cid}&cid=${post.cid}#${post.cid}`}
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
    </>
  )
}

