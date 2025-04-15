import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";

export default function LikeForumPage() {
  return (
    <div className="main-container justify-center">
      <h1>用户关注贴吧查询</h1>
      <TripleSelectInput path="/likeForum" />
      <Tutorial />
    </div>
  );
}
