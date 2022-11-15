import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const RenderThemeChanger = () => {

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "light") {
    return (
      <SunIcon className="w-10 h-10 cursor-pointer" onClick={() => setTheme('dark')} />
    )
  }

  else {
    return (
      <MoonIcon className="w-10 h-10 cursor-pointer" onClick={() => setTheme('light')} />
    )
  }
};


export default RenderThemeChanger