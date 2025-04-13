import TripleSelectInput from "@custom/TripleSelectInput";
import { redirect } from "next/navigation";
import { FanForm } from "@/app/actions";
import type { RequestProps2 } from "@type/common";
import FanList from "@custom/FanList";

export default async function FollowContentPage(props: {
  params: Promise<RequestProps2>;
}) {
  const params = await props.params;

  const { method, id } = params;

  if (!["uid", "id", "un"].includes(method)) {
    redirect("/follow");
  }
  return (
    <div className="main-container justify-start">
      <h1>粉丝列表查询</h1>
      <TripleSelectInput action={FanForm} />
      <p className="page-info">
        当前正在查询用户<span>{id}</span>的粉丝列表。
      </p>
      <FanList method={method} id={id} />
    </div>
  );
}
