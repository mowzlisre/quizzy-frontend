import { useState, useEffect } from 'react';
import { Box, Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { handleAPIErrors, projectsViewAPI } from '../api';

function Sidebar({ sidebarOpen }) {
  const [projects, setProjects] = useState([]);
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsViewAPI();
        setProjects(response.data);
      } catch (error) {
        handleAPIErrors(error, navigate)
      }
    };

    fetchProjects();
  }, []);
  

  return (
    <Box width={{ base: '0', md: sidebarOpen ? '300px' : '0px' }} bg={sidebarBg} overflow="hidden" transition="width 0.3s ease-in-out">
      <Box p={4} opacity={sidebarOpen ? 1 : 0} transition="opacity 0.2s ease-in-out">
        <Stack spacing={2}>
          <Button variant="ghost" justifyContent="flex-start" gap={2} onClick={() => navigate('/dashboard')}>
            <MdSpaceDashboard fontSize={20} /> <Text>Dashboard</Text>
          </Button>
          <Box mt={3} px={4}>
            <Text fontSize="xs" fontWeight="bold">Your Projects</Text>
          </Box>
          <Flex direction="column">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Button
                  key={project.id}
                  fontSize={'sm'}
                  variant="ghost"
                  fontWeight="normal"
                  justifyContent="flex-start"
                  onClick={() => navigate(`/p/${project.id}`)}
                  maxWidth={"100%"}
                >
                  <Text 
                    isTruncated 
                    maxWidth="90%"  // ✅ Ensures text doesn't exceed button width
                    noOfLines={1}   // ✅ Limits text to one line
                    display="block" 
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {project.name}
                  </Text>
                </Button>
              ))
            ) : (
              <Text fontSize="sm" px={4} color="gray.500">No projects available</Text>
            )}
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}

export default Sidebar;
