import {LogoIcon} from "../components/LogoIcon.tsx";
import {
  Archive,
  ChatCenteredText,
  IdentificationCard,
  Intersect,
  ListMagnifyingGlass,
  UserSwitch
} from "@phosphor-icons/react";
import {NavLink} from "react-router-dom";

function Home() {
  return (
    <>
      <div className="my-3">
        <LogoIcon size={200} className="my-0 mx-auto hover:shadow-2xl"/>

      </div>

      <div className="mx-auto my-0.5">
        <div className="flex flex-col gap-4">

        </div>
        <h1 className="text-center py-3">贴吧工具箱</h1>
        <div className="flex flex-row gap-x-2 place-content-center md:hidden text-xl">
          <NavLink to="/about">教程</NavLink>
          <NavLink to="/about">关于</NavLink>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 px-3">
          <button className="iconCard" onClick={() => console.log(111)}>
            <div className="iconCardHeader">
              <Intersect size={40} className="bigIcon"/>
              <p className="iconCardHeading">成分分析(开发中)</p>
            </div>
            <p className="iconCardDescription">
              通过预设的过滤器，分析用户的成分。
            </p>
          </button>
          <NavLink className="iconCard" to="/userpost">
            <div className="iconCardHeader">
              <ChatCenteredText size={40} className="bigIcon"/>
              <p className="iconCardHeading">历史发言查询</p>
            </div>
            <p className="iconCardDescription">
              利用老版贴吧遗留API查询用户的所有历史回复。
            </p>
          </NavLink>
          <div className="iconCard">
            <div className="iconCardHeader">
              <IdentificationCard size={40} className="bigIcon"/>
              <p className="iconCardHeading">用户信息查询(开发中)</p>
            </div>
            <p className="iconCardDescription">
              关于账号的一些信息，如注册时间、关注的贴吧等。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <ListMagnifyingGlass size={40} className="bigIcon"/>
              <p className="iconCardHeading">主题帖记录查询(开发中)</p>
            </div>
            <p className="iconCardDescription">
              对用户的主题帖进行分析，包括发帖时间、回复数等。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <Archive size={40} className="bigIcon"/>
              <p className="iconCardHeading">发言留档(开发中)</p>
            </div>
            <p className="iconCardDescription">
              将用户的单条发言导出为图片留档。
            </p>
          </div>

          <NavLink className="iconCard" to="/friends">
            <div className="iconCardHeader">
              <UserSwitch size={40} className="bigIcon"/>
              <p className="iconCardHeading">互关查询</p>
            </div>
            <p className="iconCardDescription">
              分析账号的关注和粉丝，找出互相关注的用户。
            </p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Home;