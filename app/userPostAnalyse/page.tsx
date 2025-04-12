import TripleSelectInput from "@/components/custom/TripleSelectInput";
import Tutorial from "@/components/custom/Tutorial";
import { UserPostAnalyseForm } from "../actions";

export default function UserPostAnalysePage() {
  return (
    <div className="main-container justify-center">
      <h1>用户发帖分析</h1>
      <TripleSelectInput action={UserPostAnalyseForm} />
      <Tutorial />
    </div>
  );
}
