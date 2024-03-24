// import  { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";


import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About.tsx";
import Reply from "./pages/Reply.tsx";
import Error from "./pages/Error.tsx";

function App() {
  // const [, setGreetMsg] = useState("");
  // const [name, setName] = useState("");
  //
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reply" element={<Reply />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>

  );
}

export default App;
