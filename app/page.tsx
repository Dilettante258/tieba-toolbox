import Image from "next/image";
import LandingItem from "@custom/LandingItem";
import Link from "next/link";
import Brand from "@custom/Brand";
import Carousel from "@custom/Carousel";


export default function Home() {
  return (
    <div className='landing-page'>
      <section className='heading'>
        <Brand />
        <Carousel />
      </section>
      {/*<div className='grid grid-cols-3 justify-between gap-32'>*/}
      {/*  <LandingItem svg={'/itemIcon1.svg'} title={'用户发言查询'}*/}
      {/*               desc={'最基础的用户发言查询功能。支持使用ID、UID或用户名进行查询。'}*/}
      {/*               href={'/userpost'}/>*/}
      {/*  <LandingItem svg={'/itemIcon1.svg'} title={'关注贴吧查询'}*/}
      {/*               desc={'查询用户关注的贴吧。对于隐藏的用户，也可进行部分查询。'}*/}
      {/*               href={'/likeForum'}/>*/}
      {/*  <LandingItem svg={'/itemIcon1.svg'} title={'用户发言查询'}*/}
      {/*               desc={'最基础的用户发言查询功能。支持使用ID、UID或用户名进行查询。'}*/}
      {/*               href={'/userpost'}/>*/}
      {/*</div>*/}
    </div>
  );
}
