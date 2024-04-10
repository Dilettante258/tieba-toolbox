"use client"

import {Button, Input} from "@nextui-org/react";
import {usePathname, useRouter} from 'next/navigation'
import ReactDOM from "react-dom";

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  let [ username,page] = pathname.split("/").slice(2, 4);

  ReactDOM.preconnect('https://tb-api.wang1m.tech/wakeup', { crossOrigin: 'use-credentials'})

  username = decodeURI(username||'');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const un = (form.elements.namedItem("un") as HTMLInputElement).value;
    const page = (form.elements.namedItem("page") as HTMLInputElement).value;
    if (un&&page) {
      router.push(`/userpost/${un}/${page}`);
    }
    return;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="p-4">历史发言查询</h1>
        <form
          className="row"
          id="searchUserPostForm"
          onSubmit={handleSubmit}
        >
          <Input
            name="un"
            defaultValue={username}
            isClearable
            type="text"
            label="用户名 / ID"
            variant="bordered"
            className="max-w-xs mx-auto py-3"
          />
          <Input
            name="page"
            defaultValue={page}
            type="number"
            label="页数"
            variant="bordered"
            className="max-w-xs mx-auto py-3"
          />
          <Button color="primary" type="submit">
            查询
          </Button>
        </form>
      </div>
      {children}
    </>
  )
};