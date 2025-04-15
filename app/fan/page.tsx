import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";

export default function FanPage() {
  return (
    <div className="main-container justify-center">
      <h1>粉丝列表查询</h1>
      <TripleSelectInput path="/fan" />
      <Tutorial />
    </div>
  );
}
