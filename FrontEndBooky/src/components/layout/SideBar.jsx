import { Box, Drawer, Typography } from "@mui/material";
import React from 'react'
import useDarkMode from "../../hook/useDarkMode";

const SideBar = ({ isDrawerOpen, setIsDrawerOpen }) => {

  const [colorTheme, setTheme] = useDarkMode()

  return (
    <Drawer
      anchor='left'
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box p={2} width='250px' textAlign='center' role='presentation' >
        <Typography variant='h6' component='div'>
          Menu
        </Typography>
        <Box>Profile</Box>
        <Box>BookyName members</Box>
        <button onClick={() => setTheme(colorTheme)}>Mode: {colorTheme}</button>
      </Box>
    </Drawer >
  )

}
export default SideBar