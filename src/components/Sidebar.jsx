import { Box, Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Sidebar({ sidebarOpen, selectProject }) {
  const sidebarBg = useColorModeValue('white','gray.800');
  const navigate = useNavigate();
  return (
    <Box width={{ base: '0', md: sidebarOpen ? '300px' : '0px' }} bg={sidebarBg} overflow="hidden" transition="width 0.3s ease-in-out">
      <Box p={4} opacity={sidebarOpen ? 1 : 0} transition="opacity 0.2s ease-in-out">
        <Stack spacing={2}>
          <Button variant="ghost" justifyContent="flex-start" gap={2} onClick={() => navigate('/dashboard')}>
            <MdSpaceDashboard fontSize={20} /> <Text>Dashboard</Text>
          </Button>
          <Box mt={3} px={4}>
            <Text fontSize="small" fontWeight="bold">Your Projects</Text>
          </Box>
          <Flex direction="column">
            <Button variant="ghost" fontWeight="normal" justifyContent="flex-start" onClick={() => { selectProject('Project 1'); navigate('/'); }}>
              Project 1
            </Button>
            <Button variant="ghost" fontWeight="normal" justifyContent="flex-start" onClick={() => { selectProject('Project 2'); navigate('/'); }}>
              Project 2
            </Button>
            <Button variant="ghost" fontWeight="normal" justifyContent="flex-start" onClick={() => { selectProject('Project 3'); navigate('/'); }}>
              Project 3
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}

export default Sidebar;
