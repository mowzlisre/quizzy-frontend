import { Box, Button, Flex, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { HiMiniSparkles } from "react-icons/hi2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewProject } from "../api"

function CreateProject() {
    const [projectName, setProjectName] = useState("")
    const box = useColorModeValue("gray.200", "gray.700")
    const toast = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            toast({
                title: "Project name is required.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            return
        }

        try {
            setIsLoading(true)
            const res = await createNewProject({ title: projectName })

            if (res.data.status === "success") {
                toast({
                    title: "Project created!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                navigate(`/p/${res.data.project_id}`) 
            } else {
                toast({
                    title: "Failed to create project.",
                    description: res.data.error || "Unknown error",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
            setIsLoading(false)
        } catch (err) {
            toast({
                title: "API Error",
                description: err.response?.data?.error || err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setIsLoading(false)
        }
    }

    return (
        <Flex direction={"column"} width={"100%"} px={5}>
            <Box m={"auto"}>
                <Box p={10} gap={5} textAlign={"center"}>
                    <Text fontSize={"3xl"}>Let's give your new project a name!</Text>
                    <Text>Learning is fun. When learnt in the fun way</Text>
                </Box>

                <Flex bg={box} borderRadius={"full"} p={2}>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        border={"none"}
                        bg={"none"}
                        fontSize={'lg'}
                        _focus={{ outline: "none", boxShadow: "none", border: "none" }}
                        outline={"none"}
                        placeholder="Project Name"
                        height={"60px"}
                        width={"100%"}
                        m={"auto"}
                    />
                    <Button my={'auto'} mr={3} borderRadius={"full"} isLoading={isLoading} onClick={handleCreateProject}>
                        <HiMiniSparkles />
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default CreateProject
