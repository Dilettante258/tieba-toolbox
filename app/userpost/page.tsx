import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";

export default function UserPostPage() {
  return (
    <div className="main-container justify-center">
      <h1>用户回复贴查询</h1>
      <TripleSelectInput path="/userpost" />
      <Tutorial />
    </div>
  );
}
