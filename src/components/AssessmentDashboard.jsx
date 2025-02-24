import { Box, Button, Card, Flex, Stat, StatLabel, StatNumber, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { assessmentViewAPI } from "../api";
import AttemptsTable from "./charts/AttemptsTable";

function AssessmentDashboard({ uuid }) {
    const color = useColorModeValue("gray.100", "gray.700");
    const statbox = useColorModeValue("gray.200", "gray.600");
    const [assessment, setAssessment] = useState(null);
    const [stats, setStats] = useState([
        { label: "Mean", value: "N/A" },
        { label: "Median", value: "N/A" },
        { label: "All-Time Best", value: "N/A" },
        { label: "Max Score", value: "N/A" },
    ]);

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

    console.log(assessment)

    return (
        assessment &&
        <Flex direction={'column'} width={"100%"} p={8}>
            <Flex justify="space-between" align="center" mb={6}>
                <Box><Text fontSize={'2xl'}>{assessment.assessment_title}</Text> <Text fontSize={'xs'}>Generated <b>{assessment.created}</b></Text></Box>
                <Button colorScheme="blue" size={"sm"}>Take Assessment</Button>
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
        </Flex>
    );
}

export default AssessmentDashboard;
