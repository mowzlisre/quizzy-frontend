import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Dashboard from './Dashboard';

function Sandbox({ project }) {
  console.log(project)
  return (
    <Flex direction="column" flex="1" justify="space-between">
      <Box p={4} flex="1" overflowY="auto">
        {project === 'Dashboard' ? (
          <Dashboard />
        ) : project ? (
          <Box>
            <Text fontSize="2xl">{project} Details</Text>
          </Box>
        ) : (
          <Flex height="100%" align="center" justify="center">
            <Text fontSize="2xl" color={useColorModeValue('gray.600','gray.300')}>How can I help you?</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

export default Sandbox;
