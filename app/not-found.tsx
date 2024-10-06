import Link from 'next/link'
import { LinkBreak } from "@phosphor-icons/react/dist/ssr";

export default async function NotFound() {
  console.log(Error)
  return (
    <main>
      <div id="unusual-page">
        <LinkBreak size={80}/>
        <h1>Oops!</h1>
        <p>很抱歉，发生了意外错误。</p>
        <Link href={"/"} className="hover:underline text-blue-500">返回首页</Link>
      </div>
    </main>
  )
}