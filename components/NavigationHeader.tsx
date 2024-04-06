"use client"

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import {LogoIcon} from "./LogoIcon";
import {ThemeSwitcher} from "@/components/ThemeSwitch";
import {Gear} from "@phosphor-icons/react";
import Link from "next/link";




export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "UserPost",
    "related",
    "Fans",
    "Follows",
    "FollowForums",
    "Home",
    "About",
    "Tutorial",
    "Config",
  ]
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href='/' className="text-current">
          <NavbarBrand>
            <LogoIcon className="m-1"/>
            <p className="font-bold text-inherit">贴吧工具箱</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/tutorial">
            教程
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            首页
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            关于
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/*<NavbarItem className="hidden lg:flex">*/}
        {/*  <Link href="#">Login</Link>*/}
        {/*</NavbarItem>*/}
        <ThemeSwitcher />
        <NavbarItem>
          <Button as={Link} color="primary" href="/config" variant="faded" isIconOnly>
          <Gear size={32} />
          </Button>
        </NavbarItem>

      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
