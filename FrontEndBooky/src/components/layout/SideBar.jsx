import { Box, Drawer, Typography } from "@mui/material";
import React from 'react'

const SideBar = ({ isDrawerOpen, setIsDrawerOpen }) => {

  return (
    <Drawer
      anchor='left'
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box p={2} width='250px' textAlign='center' role='presentation'>
        <Typography variant='h6' component='div'>
          Side Panel
        </Typography>
      </Box>
    </Drawer>
  )
}

export default SideBar