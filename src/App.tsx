import  { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
// import "./App.css";
import NavigationHeader from "./components/NavigationHeader.tsx";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      <NavigationHeader />
      <div className="container">
        <div className="flex flex-col gap-4">

        </div>
        <h1>Welcome to Tauri!</h1>


        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>
        <p>Click on the Tauri, Vite, and React logos to learn more.</p>


        <p>{greetMsg}</p>
      </div>
    </>

  );
}

export default App;
