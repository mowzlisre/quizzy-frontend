import { Box, Card, Grid, HStack, Text } from '@chakra-ui/react';
import AggregateScore from './charts/AggregateScore';
import FileList from './charts/FileList';

function Dashboard() {
  return (
    <Box p={4} width="100%">
      <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr 2fr 1fr' }} alignItems={"stretch"} gap={4}>
        <Box>
          <Card p={5} h={"full"} py={7} justifyContent={'center'}>
            <AggregateScore value={82.3} label={"Score"}/>
          </Card>
        </Box>
        <Box>
          <Card p={3} h={"full"} justifyContent={'center'}>
            <Text mx={'auto'} fontSize={'sm'}>Chart will be displayed here</Text>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
}

export default Dashboard;
