import { Box, Button, Card, Flex, Grid, Text, useToast } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AggregateScore from "./charts/AggregateScore";
import AssessmentTable from "./charts/AssessmentTable";
import FileList from "./charts/FileList";
import { useEffect, useState } from "react";
import { handleAPIErrors, projectViewAPI } from "../api";

function ProjectDashboard() {
    const navigate = useNavigate();
    const toast = useToast()
    const [uuid, setUuid] = useState("");
    const [project, setProject] = useState({})
    useEffect(() => {
        const url = window.location.pathname;
        const uuidFromUrl = url.split("/").pop();
        setUuid(uuidFromUrl);
    }, []);

    const data = [
        { name: "Project 1", score: 82.3 },
        { name: "Project 2", score: 78.9 },
        { name: "Project 3", score: 88.1 }
    ]
    
    const fetchProjects = async () => {
        try {
            const response = await projectViewAPI(uuid);
            setProject(response.data);
        } catch (error) {
            console.log("Handle")
            handleAPIErrors(error, navigate)
        }
        };

    useEffect(() => {
        if(uuid){
        
            fetchProjects();
        }
    }, [uuid]);

    const refreshFiles = () => {
        fetchProjects()
    }

    const handleNewAssessment = () => {
        if (project.materials === undefined || project.materials.length === 0) {
          toast({
            title: "Project Materials are empty",
            status: "warning",
            duration: 3000,
          });
          return;
        }
        navigate(`/a/new/${uuid}`)
      };
      

    return (
        project &&
        <Flex direction={'column'} p={4} width="100%" gap={4} overflowY={'auto'}>
            <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr 2fr 1fr' }} alignItems={"stretch"} gap={4}>
                <Box>
                    <Card p={5} h={"full"} py={7} justifyContent={'center'}>
                        <AggregateScore value={"NaN"} data={data} label={"Score"} />
                    </Card>
                </Box>
                <Box>
                    <Card p={3} h={"full"} justifyContent={'center'}>
                        <Text mx={'auto'} fontSize={'sm'}>Project {project.name} Chart will be displayed here</Text>
                    </Card>
                </Box>
                <Box>
                    <Card p={3} h={"full"}>
                        <FileList data={project.materials} refreshFiles={refreshFiles} />
                    </Card>
                </Box>
            </Grid>

                <Box>
                    <Flex py={3} px={6} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize="md" fontWeight="bold">
                            Assessments on {project.name}
                        </Text>
                        <Button colorScheme={"green"} size={'sm'} gap={1} onClick={handleNewAssessment}>
                            <GoPlus fontSize={16} /> New
                        </Button>
                    </Flex>

                    <Card justifyContent={'center'} p={0} pb={3}>
                        <AssessmentTable uuid={project.id} />
                    </Card>
                </Box>

        </Flex>
    )
}

export default ProjectDashboard