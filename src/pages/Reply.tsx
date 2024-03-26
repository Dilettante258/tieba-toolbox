import {Button, ButtonGroup, Input} from "@nextui-org/react";
import React, {useState} from "react";

import {compactPost} from '../api/type';


import '../reply.css'
import getPost from "../api/post.ts";
import {Chip} from "@nextui-org/react";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";


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
           className=""
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


function Reply() {
  const [id, setId] = useState("")
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<Array<React.ReactElement>>([])

  async function HandelSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id === "") {
      return;
    }
    await getPost(id, page).then( (res:any) => {
      return PostList({posts: res}) as Array<React.ReactElement>;
    }).then(
      (result) => setData(result)
    );
  }

  async function HandelChangePage(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e?.preventDefault();
    if (id === "") {
      return;
    }
    await getPost(id, page).then( (res:any) => {
      return PostList({posts: res}) as Array<React.ReactElement>;
    }).then(
      (result) => setData(result)
    );
    scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
      <>
        <div className="text-center">
          <h1 className="p-2">历史发言查询</h1>
          <form
            className="row"
            onSubmit={HandelSubmit}
          >
            <Input
              isClearable
              type="text"
              label="用户名 / ID"
              variant="bordered"
              onClear={() => console.log("input cleared")}
              value={id}
              onValueChange={(value) => setId(value)}
              className="max-w-xs mx-auto py-3"
            />
            <Input
              isClearable
              type="number"
              label="页数"
              variant="bordered"
              onClear={() => console.log("input cleared")}
              value={page.toString()}
              onValueChange={(value) => setPage(+value)}
              className="max-w-xs mx-auto py-3"
            />
            <Button color="primary" type="submit">
              Button
            </Button>
          </form>
        </div>
        <div className="rid grid-cols-1 divide-y divide-gray-400">
          {data}
        </div>
        {(data?.length > 0) &&
          <div className="text-center p-2 pb-4">
            <ButtonGroup>
              <Button color="primary"
                      onClick={(e) => {setPage(page - 1);HandelChangePage(e)}}
                      isDisabled={page==1}
                      startContent={<CaretLeft/>}
              >
                上一页
              </Button>
              <Button color="primary"
                      onClick={(e) => {setPage(page + 1);HandelChangePage(e)}}
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

export default Reply;