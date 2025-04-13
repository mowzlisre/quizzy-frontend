import "@/index.css";
import {
    Box,
    Button,
    Card,
    Flex,
    Text,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { attemptAnalytics } from "../api";

const AtemptAnalytics = () => {
    const [questions, setQuestions] = useState([]);
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams();
    const feedbackbg = useColorModeValue("blue.400", "blue.200");
    const feedbackcolor = useColorModeValue("white", "black");
    const sourcebg = useColorModeValue("purple.400", "purple.200");
    const sourcecolor = useColorModeValue("white", "black");
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours > 0 ? String(hours).padStart(2, "0") : null,
            minutes > 0 ? String(minutes).padStart(2, "0") : "00",
            String(secs).padStart(2, "0") 
        ].filter(Boolean).join(":");
    };
    useEffect(() => {
        const fetchAttemptData = async () => {
            try {
                const response = await attemptAnalytics(uuid);
                console.log(response.data)
                if (response.data && response.data.questions) {
                    setQuestions(response.data.questions); // Structure assumed
                }
                if (response.data) {
                    let data = response.data
                    delete data["questions"]
                    setMeta(data)
                }
            } catch (error) {
                console.error("Failed to fetch attempt analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        if (uuid) {
            fetchAttemptData();
        }
    }, [uuid]);

    return (
        <Flex direction={"column"} width={"100%"} overflowY={"auto"} gap={5} p={5}>
            <Flex justifyContent={"center"} pb={0}>
                <Card p={10} width={"100%"} gap={3}>
                    <Text fontSize={"3xl"}>{meta.title} | Attempt Analytics</Text>
                    <Text textAlign={'justify'}>This page provides a detailed breakdown of your quiz performance. For each question, you'll see whether your answer was correct or incorrect, the points you earned, and personalized feedback explaining the correct answer. Use these insights to identify your strengths and areas that need improvement, helping you prepare more effectively for future assessments.</Text>
                </Card>
            </Flex>

            <Flex width={"100%"} gap={5}>
                <Flex direction={'column'} width={{ base: "100%", xl: "70%" }} gap={5}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        questions.map((q) => (
                            <Card key={q.id} p={8} width={"100%"} gap={5}>
                                <Flex justifyContent={'space-between'}>
                                    <Flex gap={5}>
                                        <Text fontWeight={"bold"} fontSize={'xl'}>Question {q.id}</Text>
                                        <Button size={'sm'}>{q.type}</Button>
                                    </Flex>
                                </Flex>
                                <Flex direction={'column'} gap={5}>
                                    <Text>{q.question}</Text>

                                    {q.type === 'mcq' && q.options && (
                                        q.options.map((option, index) => (
                                            <Button
                                                key={index}
                                                display="flex"
                                                justifyContent="flex-start"
                                                px={5}
                                                py={8}
                                                width={"100%"}
                                                whiteSpace="normal"
                                                textAlign={'start'}
                                                colorScheme={q.userAnswer === option ? (q.userAnswer === q.correctAnswer ? "green" : "red") : "gray"}
                                            >
                                                {option}
                                            </Button>
                                        ))
                                    )}

                                    {q.type !== 'mcq' && (
                                        <Textarea
                                            p={3}
                                            resize="false"
                                            variant={'filled'}
                                            value={q.userAnswer}
                                            isReadOnly
                                        />
                                    )}

                                    <Flex alignItems="center" gap={3}>
                                        {q.userAnswer === ''}
                                        {q.userAnswer === q.correctAnswer
                                            ? <FaCheckCircle color="green" />
                                            : <FaTimesCircle color="red" />}
                                        <Text color={q.userAnswer === q.correctAnswer ? "green.500" : "red.500"}>
                                            {q.userAnswer === '' ? "No Answer" : q.userAnswer === q.correctAnswer ? "Correct Answer" : "Incorrect Answer"}
                                        </Text>
                                    </Flex>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        {
                                            q.type === "mcq" || q.type === 'fill' &&
                                            <>Correct Answer: {q.correctAnswer}</>
                                        }
                                    </Text>
                                    <Box p={5} bg={feedbackbg} borderRadius={5} color={feedbackcolor}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>Feedback</Text>
                                        <Text textAlign={'justify'} fontSize={'sm'}>{q.feedback}</Text>
                                    </Box>
                                    <Box p={5} bg={sourcebg} borderRadius={5} color={sourcecolor}>
                                        <Text fontWeight={"bold"} fontSize={"sm"}>Source</Text>
                                        <Text textAlign={'justify'} fontSize={'sm'}>{q.context}</Text>
                                    </Box>
                                </Flex>
                            </Card>
                        ))
                    )}
                </Flex>
                <Flex position={"sticky"} top={"10"} alignSelf={'start'} direction={'column'} minW={{ base: "100%", xl: "30%" }} pr={5} gap={8} pb={{ base: 10 }}>
                    <Card p={6} width={"100%"}>
                        <Text fontSize={"2xl"} mb={3}>Analytics Summary</Text>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Total Points:</Text>
                            <Text>{meta.score} / {meta.max_score}</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Time Taken:</Text>
                            <Text>{formatTime(meta.time_taken)}</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Total Questions:</Text>
                            <Text>{questions.length}</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Answered:</Text>
                            <Text>{questions.filter(q => q.isAnswered).length}</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text fontWeight={"bold"}>Unanswered:</Text>
                            <Text>{questions.filter(q => !q.isAnswered).length}</Text>
                        </Flex>
                    </Card>

                </Flex>
            </Flex>
        </Flex>
    );
};

export default AtemptAnalytics;
