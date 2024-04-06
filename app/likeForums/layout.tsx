"use client"

import {Button, Input} from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation'

export default function Layout({
                                 children
                               }: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  let username = pathname.split("/")[2];

  username = decodeURI(username||'');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const un = (form.elements.namedItem("un") as HTMLInputElement).value;
    if (un) {
      router.push(`/likeForums/${un}`);
    }
    return;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="p-4">
          关注吧分析
        </h1>
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
          <Button color="primary" type="submit">
            查询
          </Button>
        </form>
      </div>
      {children}
    </>
  )
};