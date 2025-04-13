import TripleSelectInput from "@custom/TripleSelectInput";
import Tutorial from "@custom/Tutorial";
import {ProfileForm} from "@/app/actions";

export default function UserProfilePage() {
  return (
    <div className="main-container justify-center">
      <h1>用户资料查询</h1>
      <TripleSelectInput action={ProfileForm} />
      <Tutorial />
    </div>
  );
}
