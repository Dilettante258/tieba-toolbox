import  { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import {LogoIcon} from "./components/LogoIcon.tsx";
import {
  Detective,
  UserList,
  ListMagnifyingGlass,
  ChalkboardTeacher, UserSwitch, ChatCenteredText, IdentificationCard, Archive, LineSegments, Intersect
} from "@phosphor-icons/react";
function App() {
  const [, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main>
      <div className="my-3">
        <LogoIcon size={200} className="my-0 mx-auto hover:shadow-2xl"/>

      </div>

      <div className="mx-auto my-0.5">
        <div className="flex flex-col gap-4">

        </div>
        <h1 className="text-center py-3">贴吧工具箱</h1>

        {/*<form*/}
        {/*  className="row"*/}
        {/*  onSubmit={(e) => {*/}
        {/*    e.preventDefault();*/}
        {/*    greet();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <input*/}
        {/*    id="greet-input"*/}
        {/*    onChange={(e) => setName(e.currentTarget.value)}*/}
        {/*    placeholder="Enter a name..."*/}
        {/*  />*/}
        {/*  <button type="submit">Greet</button>*/}
        {/*</form>*/}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 px-3">
          <div className="iconCard">
            <div className="iconCardHeader">
              <Intersect size={40} className="bigIcon"/>
              <p className="iconCardHeading">成分分析</p>
            </div>
            <p className="iconCardDescription">
              通过预设的过滤器，分析用户的成分。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <ChatCenteredText size={40} className="bigIcon"/>
              <p className="iconCardHeading">发言记录查询</p>
            </div>
            <p className="iconCardDescription">
              利用老版贴吧遗留API查询用户的所有历史回复。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <IdentificationCard size={40} className="bigIcon"/>
              <p className="iconCardHeading">用户信息查询</p>
            </div>
            <p className="iconCardDescription">
              关于账号的一些信息，如注册时间、关注的贴吧等。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <ListMagnifyingGlass size={40} className="bigIcon"/>
              <p className="iconCardHeading">主题帖记录查询</p>
            </div>
            <p className="iconCardDescription">
              对用户的主题帖进行分析，包括发帖时间、回复数等。
            </p>
          </div>
          <div className="iconCard">
            <div className="iconCardHeader">
              <Archive size={40} className="bigIcon"/>
              <p className="iconCardHeading">发言留档</p>
            </div>
            <p className="iconCardDescription">
              将用户的单条发言导出为图片留档。
            </p>
          </div>

          <div className="iconCard">
            <div className="iconCardHeader">
              <UserSwitch size={40} className="bigIcon"/>
              <p className="iconCardHeading">互关查询</p>
            </div>
            <p className="iconCardDescription">
              分析账号的关注和粉丝，找出互相关注的用户。
            </p>
          </div>
        </div>
      </div>
    </main>

  );
}

export default App;
