import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";

export default function UserProfilePage() {
  return (
    <div className="main-container justify-center">
      <h1>用户资料查询</h1>
      <TripleSelectInput path="/profile" />
      <Tutorial />
    </div>
  );
}
