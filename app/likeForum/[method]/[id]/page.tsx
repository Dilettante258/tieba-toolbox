import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import type {RequestProps2} from "@type/common";
import LikeForum from "@custom/LikeForum";



export default async function LikeForumContentPage(props: { params: Promise<RequestProps2> }) {
  const params = await props.params;

  const {
    method,
    id
  } = params;

  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/likeForum');
  }
  return (
    <div className="main-container justify-start">
      <h1>用户关注贴吧查询</h1>
      <TripleSelectInput path="/likeForum" />
      <p className="page-info">当前正在查询用户<span>{id}</span>的关注贴吧。</p>
      <LikeForum method={method} id={id} />
    </div>
  );
}
