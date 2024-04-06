"use client"

import {Button, Textarea} from "@nextui-org/react";
import {useState} from "react";

export default function Page() {
  const [BDUSS, setBDUSS] = useState<string>(
    typeof window !== "undefined" ? (localStorage.getItem('BDUSS')||'') : '');
  return (
    <div className="flex flex-col text-center place-content-center">
      <h1>设置</h1>
      <form className="place-item-center">
      <Textarea
          label="BDUSS"
          value={BDUSS}
          onChange={(e) => {
            setBDUSS(e.target.value);
          }}
          placeholder="输入BDUSS"
          className="max-w-xs mx-auto py-3"
      />
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          localStorage.setItem('BDUSS', BDUSS);
        }}
      >
          保存
      </Button>
      </form>
    </div>
  )
};