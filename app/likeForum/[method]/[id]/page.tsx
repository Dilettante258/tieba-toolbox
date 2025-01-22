import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import {LikeForumForm} from "@/app/actions";
import {type RequestProps2} from "@type/common";
import LikeForum from "@custom/LikeForum";



export default function LikeForumContentPage({ params:{method,id} }: { params: RequestProps2 }) {
  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/likeForum');
  }
  return (
    <div className="main-container justify-center">
      <h1>用户关注贴吧查询</h1>
      <TripleSelectInput action={LikeForumForm}/>
      <p className="page-info">当前正在查询用户<span>{id}</span>的关注贴吧。</p>
      <LikeForum method={method} id={id} />
    </div>
  );
}
