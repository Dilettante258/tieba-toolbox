import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import {ProfileForm} from "@/app/actions";
import {type RequestProps2} from "@type/common";
import Profile from "@custom/Profile";



export default function ProfileContentPage({ params:{method,id} }: { params: RequestProps2 }) {
  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/profile');
  }
  return (
    <div className="main-container justify-center">
      <h1>用户资料查询</h1>
      <TripleSelectInput action={ProfileForm}/>
      <p className="page-info">当前正在查询用户<span>{id}</span>的关注贴吧。</p>
      <Profile method={method} id={id}/>
    </div>
  );
}
