import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";
import {FollowForm, LikeForumForm} from "@/app/actions";

export default function LikeForumPage() {
  return (
    <div className="main-container justify-center">
      <h1>关注列表查询</h1>
      <TripleSelectInput action={FollowForm} />
      <Tutorial />
    </div>
  );
}
