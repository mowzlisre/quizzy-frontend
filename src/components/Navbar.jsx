import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { LuFolderPen } from "react-icons/lu";
import { TbLayoutSidebarFilled } from "react-icons/tb";

function Navbar({ toggleSidebar, openNewSandbox, colorMode, toggleColorMode }) {
  const headerBg = useColorModeValue('white','gray.700');
  return (
    <Flex bg={headerBg} p={4} align="center" justify="space-between" borderBottom="1px" borderColor={useColorModeValue('gray.200','gray.600')}>
      <Flex align="center">
        <Button p={0} variant={"ghost"} onClick={toggleSidebar}><TbLayoutSidebarFilled fontSize={25} /></Button>
        <Button p={0} variant={"ghost"} onClick={openNewSandbox} mr={2}><LuFolderPen fontSize={23} /></Button>
        <Text fontSize="xl" fontWeight="bold">Quizzy</Text>
      </Flex>
      <Button p={0} variant={"ghost"} onClick={toggleColorMode} mr={2}>{colorMode==='light' ? <FiMoon /> : <FiSun />}</Button>
    </Flex>
  );
}

export default Navbar;
