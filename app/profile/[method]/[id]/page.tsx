import { ProfileForm } from "@/app/actions";
import { getUserData } from "@/utils/getUserData";
import TripleSelectInput from "@custom/TripleSelectInput";
import type { RequestProps2 } from "@type/common";
import { redirect } from "next/navigation";
import ProfileCards from "./components/Card";
import { Suspense, use } from "react";

export default function ProfileContentPage({
  params: { method, id },
}: {
  params: RequestProps2;
}) {
  if (!["uid", "id", "un"].includes(method)) {
    redirect("/profile");
  }
  const userData = use(getUserData({ method, id }));

  return (
    <div className="main-container justify-start relative">
      <TripleSelectInput action={ProfileForm} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileCards {...userData} />
      </Suspense>
    </div>
  );
}
