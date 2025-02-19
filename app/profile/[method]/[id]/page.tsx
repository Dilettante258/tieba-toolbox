import TripleSelectInput from "@custom/TripleSelectInput";
import {redirect} from "next/navigation";
import {ProfileForm} from "@/app/actions";
import {type RequestProps2} from "@type/common";
import Profile from "@custom/Profile";



export default function ProfileContentPage({ params:{method,id} }: { params: RequestProps2 }) {
  if (!['uid', 'id', 'un'].includes(method)){
    redirect('/profile');
  }
  return (
    <div className="main-container justify-start">
      <div className='mt-[-4rem]'></div>
      <TripleSelectInput action={ProfileForm}/>
      <Profile method={method} id={id}/>
    </div>
  );
}
