import {
    Box, Button,
    ButtonGroup,
    Card, Flex,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stat, StatLabel, StatNumber, Text,
    useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuAlarmClockCheck, LuAlarmClockOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { assessmentViewAPI, createNewAttempt } from "../api";
import AttemptsTable from "./charts/AttemptsTable";
import { da } from "date-fns/locale";

function AssessmentDashboard({ uuid }) {
    const color = useColorModeValue("gray.100", "gray.700");
    const statbox = useColorModeValue("gray.200", "gray.600");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [assessment, setAssessment] = useState(null);
    const [stats, setStats] = useState([
        { label: "Mean", value: "N/A" },
        { label: "Median", value: "N/A" },
        { label: "All-Time Best", value: "N/A" },
        { label: "Max Score", value: "N/A" },
    ]);
    const navigate = useNavigate()

    // State for settings
    const [mode, setMode] = useState("Untimed"); // Default mode
    const [partialScoring, setPartialScoring] = useState(false);
    const [negativeScoring, setNegativeScoring] = useState(false);
    const [proctoredMode, setProctoredMode] = useState(false);
    const [duration, setDuration] = useState(20); // keep as numeric

    const format = (val) => `${val} Minutes`;

    const inc = {
        onClick: () => setDuration((prev) => (prev < 120 ? prev + 5 : prev)),
    };

    const dec = {
        onClick: () => setDuration((prev) => (prev > 10 ? prev - 5 : prev)),
    };


    useEffect(() => {
        if (uuid) {
            const fetchAssessment = async () => {
                try {
                    const response = await assessmentViewAPI(uuid);
                    const data = response.data;
                    setAssessment(data);

                    // Calculate statistics based on attempts
                    if (data.attempts && data.attempts.length > 0) {
                        const scores = data.attempts.map(attempt => attempt.attempt_score);

                        const mean = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2);
                        const median = calculateMedian(scores);
                        const best = Math.max(...scores);
                        const maxScore = data.attempts[0]?.max_score || "N/A"; // Assuming all attempts have the same max score

                        setStats([
                            { label: "Mean", value: mean },
                            { label: "Median", value: median },
                            { label: "All-Time Best", value: best },
                            { label: "Max Score", value: maxScore },
                        ]);
                    }
                } catch (error) {
                    console.error("Error fetching assessment:", error);
                }
            };

            fetchAssessment();
        }
    }, [uuid]);

    function calculateMedian(scores) {
        if (scores.length === 0) return "N/A";
        scores.sort((a, b) => a - b);
        const mid = Math.floor(scores.length / 2);
        return scores.length % 2 !== 0 ? scores[mid] : ((scores[mid - 1] + scores[mid]) / 2).toFixed(2);
    }

    const handleNewAttempt = async () => {
        const attemptData = {
            uuid,
            mode,
            partialScoring,
            negativeScoring,
            proctoredMode,
            duration,
        };
        try {
            const response = await createNewAttempt(attemptData);
            const data = response.data;
            onClose();
            navigate(`/t/${data.id}`, { state: { attempt: data } });
        } catch (error) {
            console.error("Error starting new attempt:", error);
        }
    }

    return (
        assessment &&
        <Flex direction={'column'} width={"100%"} p={8}>
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Text fontSize={'2xl'}>{assessment.assessment_title}</Text>
                    <Text fontSize={'xs'}>Generated <b>{assessment.created}</b></Text>
                </Box>
                <Flex gap={3}>
                    <Button colorScheme="blue" size={"sm"} onClick={onOpen}>Take Assessment</Button>
                </Flex>
            </Flex>
            <Box bg={color} p={4} borderRadius="md" mb={6}>
                <Flex px={5} justify="space-between">
                    <Box>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Author</Text>
                        <Text fontSize={'xl'}>{assessment.author_name}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Difficulty</Text>
                        <Text fontSize={'xl'}>{assessment.difficulty}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Status</Text>
                        <Text fontSize={'xl'}>{assessment.status}</Text>
                    </Box>
                </Flex>
            </Box>
            <Flex gap={4} mb={6}>
                {stats.map((item, index) => (
                    <Stat key={index} bg={statbox} p={4} borderRadius="md" flex="1">
                        <StatLabel>{item.label}</StatLabel>
                        <StatNumber>{item.value}</StatNumber>
                    </Stat>
                ))}
            </Flex>
            <Text mb={4}>Previous Attempts</Text>
            <Card justifyContent={'center'} p={0} pb={3}>
                <AttemptsTable data={assessment.attempts} />
            </Card>

            {/* New Assessment Instructions Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p={8}>
                        <Text fontWeight="bold" mb={4}>Select Your preferences for this Attempt</Text>
                        <Flex direction={'column'} gap={4}>
                            <Flex gap={4} justify="center">
                                <Box flex="1" aspectRatio={1} minW="50px">
                                    <Button
                                        colorScheme={mode === "Timed" ? "blue" : "gray"}
                                        onClick={() => setMode("Timed")}
                                        w="100%"
                                        h="100%"
                                    >
                                        <Flex justifyContent="center" alignItems="center" direction="column" gap={2}>
                                            <Box><LuAlarmClockCheck fontSize={50} /></Box>
                                            <Text textAlign="center">Timed</Text>
                                        </Flex>
                                    </Button>
                                </Box>
                                <Box flex="1" aspectRatio={1} minW="50px">
                                    <Button
                                        colorScheme={mode === "Timed" ? "gray" : "blue"}
                                        onClick={() => setMode("Untimed")}
                                        w="100%"
                                        h="100%"
                                    >
                                        <Flex justifyContent="center" alignItems="center" direction="column" gap={2}>
                                            <Box><LuAlarmClockOff fontSize={50} /></Box>
                                            <Text textAlign="center">Untimed</Text>
                                        </Flex>

                                    </Button>
                                </Box>
                            </Flex>
                            {
                                mode === "Timed" &&
                                <Flex>
                                    <HStack>
                                        <Button {...dec}>-</Button>
                                        <Input
                                            textAlign={'center'}
                                            border={'none'}
                                            value={format(duration)}
                                            readOnly
                                        />
                                        <Button {...inc}>+</Button>
                                    </HStack>
                                    <Box m={'auto'}><LuAlarmClockCheck fontSize={25} /></Box>
                                </Flex>
                            }
                            <ButtonGroup isAttached w="100%" justifyContent="center">
                                <Button
                                    onClick={() => setPartialScoring(!partialScoring)}
                                    colorScheme={partialScoring ? "green" : "gray"}
                                    flex="1"
                                    borderColor="gray.300"
                                    fontSize={'sm'}
                                >
                                    Partial
                                </Button>
                                <Button
                                    onClick={() => setNegativeScoring(!negativeScoring)}
                                    colorScheme={negativeScoring ? "red" : "gray"}
                                    flex="1"
                                    borderLeft="0.5px solid"
                                    borderRight="0.5px solid"
                                    borderColor="gray.500"
                                    fontSize={'sm'}
                                >
                                    Negative
                                </Button>
                                <Button
                                    onClick={() => setProctoredMode(!proctoredMode)}
                                    colorScheme={proctoredMode ? "orange" : "gray"}
                                    flex="1"
                                    fontSize={'sm'}
                                    disabled
                                >
                                    Proctored
                                </Button>
                            </ButtonGroup>
                            <Button colorScheme="green" fontSize={'sm'} onClick={handleNewAttempt}>
                                Start Assessment
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default AssessmentDashboard;
