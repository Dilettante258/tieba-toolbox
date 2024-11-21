import Image from "next/image";
import LandingItem from "@custom/LandingItem";
import Link from "next/link";


export default function Home() {
  return (
    <div className='landing-page'>
      <div className='landing-page-content'>
        <div className='content-text'>
          <h1>贴吧工具箱</h1>
          <p>
            Google Play 是面向超过 20 亿活跃 Android 设备快速发布应用和游戏的理想平台，不仅能帮助您在全球范围内拓展用户群，还能让您通过应用和游戏赚取收入。
          </p>
          <Link href='/help'>
            <button>访问使用说明</button>
          </Link>
        </div>
        <div className='mx-16'>
          <Image src='/hero.png' alt='icon' width={250} height={250} />
        </div>
      </div>
      <div className='flex flex-row justify-between gap-32'>
        <LandingItem />
        <LandingItem />
        <LandingItem />
      </div>



    </div>
  );
}
