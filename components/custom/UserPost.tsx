import type { UserPost } from "@utils/types";
import styles from "./UserPost.module.css";
import { AlignVerticalSpaceAround } from "lucide-react";
import type { RequestProps1 } from "@type/common";
import { getData } from "@utils/constants";
import NoData from "@custom/NoData";
import { type ErrorRes, isErrorData } from "@utils/typeTools";
import clsx from "clsx";
import { Fragment } from "react";

async function getUserPost({ method, id, page }: RequestProps1) {
  return (await getData("/user/posts", { method, id, page })) as
    | UserPost[]
    | ErrorRes;
}

export function UserPostListItemComp({
  post,
  className,
  style,
}: {
  post: UserPost;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className ?? styles.post} style={style}>
      <p className={styles.postInfo}>
        在
        <a
          href={`https://tieba.baidu.com/f?kw=${post.forumName}`}
          target="_blank"
          className={styles.forumName}
          rel="noreferrer"
        >
          {post.forumName}吧
        </a>
        回复
        <a
          href={`https://tieba.baidu.com/p/${post.threadId}`}
          target="_blank"
          className={styles.postTitle}
          rel="noreferrer bookmark"
        >
          {post.title}
        </a>
        ：
      </p>
      <p className={styles.postContent}>
        {post.replyTo ? (
          <Fragment>
            回复
            <a
              className={styles.link}
              href={`https://tieba.baidu.com/p/${post.replyTo}`}
              target="_blank"
              rel="noreferrer"
            >
              {post.replyTo}
            </a>
            ：
          </Fragment>
        ) : (
          ""
        )}
        {post.content}
      </p>
      <div className="flex mt-auto">
        <div className="flex-grow">
          {post.affiliated ? (
            <div className={styles.tag}>
              <AlignVerticalSpaceAround className="w-4 h-4 flex-shrink-0" />
              <p>楼中楼</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="text-medium justify-self-end flex flex-row">
          <a
            href={`https://tieba.baidu.com/p/${post.threadId}?fid=${post.forumId}&pid=${post.cid}&cid=${post.cid}#${post.cid}`}
            target="_blank"
            className={`justify-self-start ${styles.link}`}
            rel="noreferrer"
          >
            链接
          </a>
          <span className={styles.postTime}>{post.createTime}</span>
        </div>
      </div>
    </div>
  );
}

export default async function UserPostList({
  method,
  id,
  page,
}: RequestProps1) {
  const data = await getUserPost({ method, id, page });
  if (data && !isErrorData(data))
    return (
      <div className={styles.postContainer}>
        {data.map((post: UserPost, index: number) => (
          <UserPostListItemComp key={index} post={post} />
        ))}
      </div>
    );
  else return <NoData />;
}
