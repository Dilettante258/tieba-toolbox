import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {LogoIcon} from "./LogoIcon";
import {ThemeSwitcher} from "./ThemeSwitch.tsx";
import {Gear} from "@phosphor-icons/react";





export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "UserPost",
    "Friends",
    "Home",
    "About",
    "Help",
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
          <Link color="foreground" href="#">
            功能
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
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
