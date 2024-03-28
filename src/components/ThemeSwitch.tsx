import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

import {Switch} from "@nextui-org/react";
import {Moon, Sun} from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Switch
      defaultSelected
      size="md"
      color="success"
      defaultChecked={systemTheme === 'light'}
      isSelected={theme !== 'dark'}
      onValueChange={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <Sun />
        ) : (
          <Moon fill="#020617"/>
        )
      }
    >
    </Switch>
  )
};