'use client'

import Link from "next/link";
import ThemeSwitch from "@custom/ThemeSwitch";
import {usePathname} from "next/navigation";
import './NavBar.css'


function NavBar() {
  const pathname = usePathname()
  return (
    <div className="site-header">
      <h3 onClick={() => window.location.href = '/'}>Tieba Toolbox</h3>
      <ul>
        <li data-active={pathname==='/'}><Link href="/">首页</Link></li>
        <li data-active={pathname==='/help'}><Link href='/help'>使用说明</Link></li>
        <li data-active={pathname==='/about'}><Link href="/about">关于</Link></li>
      </ul>
      <div className='flex-grow'></div>
      <div className='theme-switch'>
        <ThemeSwitch/>
      </div>
    </div>
  )
}

export default NavBar
