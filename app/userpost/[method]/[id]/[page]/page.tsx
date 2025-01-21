import TripleSelectInput from "@custom/TripleSelectInput";
import UserPost from "@custom/UserPost";
import {redirect} from "next/navigation";
import Tutorial from "@custom/Tutorial";
import PageButton from "@custom/PageButton";

export type RequestProps = {
  method: string,
  id: string,
  page: string
}

export default function UserPostContentPage({ params:{method,id,page} }: { params: RequestProps }) {
  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/userpost');
  }
  return (
    <div className="main-container justify-center">
      <h1>用户回复贴查询</h1>
      <TripleSelectInput/>
      <p className="page-info">当前正在查询用户<span>{id}</span>的回复贴，当前是第<span>{page}</span>页</p>
      <UserPost method={method} id={id} page={page} />
      <PageButton page={Number(page)} href={`/userpost/${method}/${id}`} />
    </div>
  );
}
