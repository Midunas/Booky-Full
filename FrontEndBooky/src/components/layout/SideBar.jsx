import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import useDarkMode from "../../hook/useDarkMode";

const SideBar = ({ isOpen, onClose }) => {

  // const [colorTheme, setTheme] = useDarkMode()

  // const theme = extendTheme({
  //   styles: {
  //     global: () => ({
  //       body: {
  //         bg: ""
  //       }
  //     })
  //   }
  // });

  return (
    <>
      {/* <ChakraProvider theme={theme}> */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent className='dark:bg-zinc-700' >
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* </ChakraProvider> */}
    </>
  )

}
export default SideBar