import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";


export default function FollowPage() {
  return (
    <div className="main-container justify-center">
      <h1>关注列表查询</h1>
      <TripleSelectInput path="/follow" />
      <Tutorial />
    </div>
  );
}
