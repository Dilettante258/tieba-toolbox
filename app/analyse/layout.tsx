"use client"

import {Button, Input} from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation'
import {method2Dict} from "@/utils/type";
import ReactDOM from "react-dom";

export default function Layout({
                                 children
                               }: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  let [method, target] = pathname.split("/").slice(2, 4) as string[];

  target = decodeURI(target||'');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const target = (form.elements.namedItem("target") as HTMLInputElement).value;
    if (target) {
      router.push(`/analyse/${method}/${target}`);
    }
    return;
  }

  ReactDOM.preconnect('https://tb-api.wang1m.tech/wakeup', { crossOrigin: 'use-credentials'})

  return (
    <>
      <div className="text-center">
        <h1 className="p-4">
          {method2Dict[method]}
        </h1>
        <form
          className="row"
          id="searchUserPostForm"
          onSubmit={handleSubmit}
        >
          <Input
            name="target"
            defaultValue={target}
            isClearable
            type="text"
            label="分析对象"
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