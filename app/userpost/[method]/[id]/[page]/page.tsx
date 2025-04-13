import TripleSelectInput from "@custom/TripleSelectInput";
import UserPost from "@custom/UserPost";
import {redirect} from "next/navigation";
import PageButton from "@custom/PageButton";
import {UserPostForm} from "@/app/actions";
import {RequestProps1} from "@type/common";


export default async function UserPostContentPage(props: { params: Promise<RequestProps1> }) {
  const params = await props.params;

  const {
    method,
    id,
    page
  } = params;

  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/userpost');
  }
  return (
    <div className="main-container justify-start">
      <h1>用户回复贴查询</h1>
      <TripleSelectInput action={UserPostForm}/>
      <p className="page-info">当前正在查询用户<span>{id}</span>的回复贴，当前是第<span>{page}</span>页</p>
      <UserPost method={method} id={id} page={page} />
      <PageButton page={Number(page)} href={`/userpost/${method}/${id}`} />
    </div>
  );
}
