import { Box, Button, Card, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import AggregateScore from "./charts/AggregateScore";
import FileList from "./charts/FileList";
import AssessmentTable from "./charts/AssessmentTable";
import { FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

function ProjectDashboard({project}) {
    return (
        <Flex direction={'column'} p={4} width="100%" gap={4} overflowY={'auto'}>
            <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr 2fr 1fr' }} alignItems={"stretch"} gap={4}>
                <Box>
                <Card p={5} h={"full"} py={7} justifyContent={'center'}>
                    <AggregateScore value={82.3} label={"Score"}/>
                </Card>
                </Box>
                <Box>
                <Card p={3} h={"full"} justifyContent={'center'}>
                    <Text mx={'auto'} fontSize={'sm'}>Project {project} Chart will be displayed here</Text>
                </Card>
                </Box>
                <Box>
                <Card p={3} h={"full"}>
                    <FileList/>
                </Card>
                </Box>
            </Grid>

            <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr' }} alignItems={"stretch"} gap={4}>
                <Box>
                    <Flex py={3} px={6} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize="md" fontWeight="bold">
                            Assessments on {project}
                        </Text>
                        <Button colorScheme={"green"} size={'sm'} gap={1}> <GoPlus fontSize={16} /> New</Button>
                    </Flex>
                    <Card justifyContent={'center'} p={0} pb={3}>
                        <AssessmentTable project={project}/>
                    </Card>
                </Box>
            </Grid>
        </Flex>
    )
}

export default ProjectDashboard