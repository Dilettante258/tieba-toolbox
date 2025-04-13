import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import {FollowForm, LikeForumForm} from "@/app/actions";
import {type RequestProps2} from "@type/common";
import FollowList from "@custom/FollowList";

export default async function FollowContentPage(props: { params: Promise<RequestProps2> }) {
  const params = await props.params;

  const {
    method,
    id
  } = params;

  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/follow');
  }
  return (
    <div className="main-container justify-start">
      <h1>关注列表查询</h1>
      <TripleSelectInput action={FollowForm} />
      <p className="page-info">当前正在查询用户<span>{id}</span>的关注列表。</p>
      <FollowList method={method} id={id} />
    </div>
  );
}
