'use client'

import Link from "next/link";
import ThemeSwitch from "@custom/ThemeSwitch";
import {usePathname} from "next/navigation";
import styles from './Navbar.module.css'
import buttonStyles from './Button.module.css';
import clsx from "clsx";
import {BadgeHelp, Book, House, Menu, Palette, Star, X} from "lucide-react";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Image from "next/image";


function NavBar() {
  const pathname = usePathname()
  const MenuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const [width, setWidth] = useState(700);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleMenuButton() {
    setShowMenu(!showMenu);
  }


  return (
    <>
      <div className={styles.siteHeader}>
        <h3 onClick={() => window.location.href = '/'} className={styles.siteLogo} aria-label='返回主页'>
          <Image src={'/logo.webp'} alt='logo' width={30} height={30} />
          ToEasy
        </h3>
        {
          width > 768 ?
            <>
                <ul>
                    <li data-active={pathname === '/'}><Link href="/">首页</Link></li>
                    <li data-active={pathname === '/help'}><Link href='/help'>使用说明</Link></li>
                    <li data-active={pathname === '/about'}><Link href="/about">关于</Link></li>
                </ul>
                <div className='flex-grow'></div>
                <Link href='https://github.com/Dilettante258/tieba-toolbox'
                      className={clsx(buttonStyles.light, buttonStyles.small)}><Star size={16}/>
                    <span>Github</span>
                    <span className='max-lg:hidden'>上为我Star</span>
                </Link>
                <Link href='/sign' className={clsx(buttonStyles.solid, buttonStyles.small)}>登录</Link>
                <Link href='/sign' className={clsx(buttonStyles.light, buttonStyles.small)}>注册</Link>
                <div className={styles.themeSwitch}>
                    <ThemeSwitch/>
                </div>
            </> : <div onClick={handleMenuButton} className={clsx(buttonStyles.light, buttonStyles.icon, 'justify-self-end')}>

              {!showMenu ?
                <Menu /> : <X />}


            </div>
        }
      </div>
      {
        showMenu &&
          <div className={styles.menu} ref={MenuRef} id="my-Menu">
              <div className={styles.menuContent}>
                  <Link href='/sign' className={clsx(buttonStyles.flat, buttonStyles.small, styles.menuBtn)}>登录</Link>
                  <Link href='/sign' className={clsx(buttonStyles.bordered, buttonStyles.small, styles.menuBtn)}>注册</Link>
                  <div className='flex items-center w-full p-1'>
                      <Palette className='pr-1' size={20}/>主题
                      <ThemeSwitch className='ml-auto justify-self-end'  />
                  </div>
                  <div onClick={() => setShowMenu(false)} className='flex flex-col gap-3'>
                      <Link href='/' ><House className='pr-1' size={20} />主页</Link>
                      <Link href='/about'><Book className='pr-1' size={20}/>文档</Link>
                      <Link href='/help'><BadgeHelp className='pr-1' size={20}/>帮助</Link>
                  </div>
              </div>
          </div>
      }


    </>
  )
}

export default NavBar
