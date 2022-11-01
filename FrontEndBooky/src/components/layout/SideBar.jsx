import { Box, Drawer, Typography, useTheme } from "@mui/material";
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { ColorModeContext } from "../../context/ColorModeContext";

const SideBar = ({ isDrawerOpen, setIsDrawerOpen }) => {

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Drawer
      anchor='left'
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box p={2} width='250px' textAlign='center' role='presentation'>
        <Typography variant='h6' component='div'>
          Menu
        </Typography>
        <Box>Profile</Box>
        <Box>BookyName members</Box>
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Drawer >
  )

}
export default SideBar