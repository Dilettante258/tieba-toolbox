import Image from "next/image";
import LandingItem from "@custom/LandingItem";
import Link from "next/link";


export default function Home() {
  return (
    <div className='landing-page'>
      <div className='landing-page-content'>
        <div className='content-text'>
          <h1>岁月史书</h1>
          <p>
            本人极其痛恨串子等行为，
            为了降低贴吧查询鉴定成分、分析的门槛，所以写了这个“岁月史书”工具箱。
          </p>
          <Link href='/help'>
            <button>访问使用说明</button>
          </Link>
        </div>
        <div className='mx-16'>
          <Image src='/hero.png' alt='icon' width={250} height={250} />
        </div>
      </div>
      <div className='grid grid-cols-3 justify-between gap-32'>
        <LandingItem svg={'/itemIcon1.svg'} title={'用户发言查询'}
                     desc={'最基础的用户发言查询功能。支持使用ID、UID或用户名进行查询。'}
                     href={'/userpost'}/>
        <LandingItem svg={'/itemIcon1.svg'} title={'关注贴吧查询'}
                     desc={'查询用户关注的贴吧。对于隐藏的用户，也可进行部分查询。'}
                     href={'/likeForum'}/>
        <LandingItem svg={'/itemIcon1.svg'} title={'用户发言查询'}
                     desc={'最基础的用户发言查询功能。支持使用ID、UID或用户名进行查询。'}
                     href={'/userpost'}/>
      </div>
    </div>
  );
}
