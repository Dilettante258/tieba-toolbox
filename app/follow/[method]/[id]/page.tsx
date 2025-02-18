import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import {LikeForumForm} from "@/app/actions";
import {type RequestProps2} from "@type/common";
import FollowList from "@custom/FollowList";

export default function LikeForumContentPage({ params:{method,id} }: { params: RequestProps2 }) {
  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/follow');
  }
  return (
    <div className="main-container justify-center">
      <h1>关注列表查询</h1>
      <TripleSelectInput action={LikeForumForm}/>
      <p className="page-info">当前正在查询用户<span>{id}</span>的关注列表。</p>
      <FollowList method={method} id={id} />
    </div>
  );
}
