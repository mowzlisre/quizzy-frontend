import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import ProjectDashboard from './ProjectDashboard';

function Sandbox({ project }) {
  return (
    project ? (
      <ProjectDashboard project={project} />
    ) : (
      <Flex height="100%" align="center" justify="center">
        <Text fontSize="2xl" color={useColorModeValue('gray.600', 'gray.300')}>How can I help you?</Text>
      </Flex>
    )
  );
}

export default Sandbox;
