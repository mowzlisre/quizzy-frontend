import "@/index.css";
import { Box, Button, Card, Center, Divider, Flex, Input, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MdBookmark } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { handleAPIErrors, startAttempt, submitAttempt } from '../../api';
import Countdown from './CountDown';


const NewAttempt = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [questions, setQuestions] = useState([]);
    const uuid = localStorage.getItem('uuid');
    const attempt = JSON.parse(localStorage.getItem('attempt_meta'));
    const { id } = useParams();
    const [isMounted, setIsMounted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const handleStartAttempt = async () => {
            const data = { id, uuid };
            try {
                const response = await startAttempt(data);
                setQuestions(response.data.quiz);
            } catch (error) {
                console.error("Error starting new attempt:", error);
            }
        };
    
        if (uuid) {
            handleStartAttempt();
        } else {
            console.error("UUID is undefined!");
        }
    }, [id, uuid]);

    useEffect(() => {
        if (questions.length > 0 && !startTime) {
            setIsMounted(true);
            const now = new Date();
            setStartTime(now.toISOString());
            console.log("Quiz started at:", now.toISOString());
        }
    }, [questions, startTime]);

    // Handle MCQ selection
    const handleMCQSelect = (qId, option) => {
        setQuestions(questions.map(q =>
            q.id === qId ? { ...q, answer: option, isAnswered: true } : q
        ));
    };

    // Handle input change for FillUps, Short Answer, Essay
    const handleInputChange = (qId, value) => {
        setQuestions(questions.map(q => {
            let answered = q.type === 'Essay' ? value.length >= 20 : value.length >= 2;
            return q.id === qId ? { ...q, answer: value, isAnswered: answered } : q;
        }));
    };

    // Handle marking a question for review
    const handleMarkForReview = (qId) => {
        setQuestions(questions.map(q =>
            q.id === qId ? { ...q, isMarked: !q.isMarked } : q
        ));
    };

    const [isVisible, setIsVisible] = useState(false);

    // Handle Scroll Event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to Top Function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleSubmitAPI = async (id, questions, attemptMeta) => {
        const data = {
            quiz: questions,
            meta: attemptMeta
        };
    
        try {
            const response = await submitAttempt(id, data);
            const responseData = response.data;
    
            if (responseData.status === "success") {
                alert("Your attempt has been submitted successfully!");
                navigate(`/a/${uuid}`);
            } else {
                alert("Submission failed: " + (responseData.error || "Unknown error"));
            }
        } catch (error) {
            handleAPIErrors(error, navigate);
        } finally {
            setIsLoading(false);
        }
    };
    
    // ✅ Handles final submit click
    const handleSubmit = () => {
        const endTime = new Date();
        const totalDuration = startTime
            ? (endTime - new Date(startTime)) / 1000
            : 0;
    
        const unanswered = questions.filter(q => !q.isAnswered);
        const marked = questions.filter(q => q.isMarked);
    
        const summary = {
            start_time: startTime,
            end_time: endTime.toISOString(),
            duration_in_seconds: totalDuration,
            total_questions: questions.length,
            answered: questions.filter(q => q.isAnswered).length,
            marked: marked.length,
            uuid: id,
        };
    
        const proceedWithSubmit = () => {
            setIsLoading(true);
            handleSubmitAPI(id, questions, summary);
        };
    
        // Confirm if user is submitting with unanswered or marked questions
        if (unanswered.length > 0 || marked.length > 0) {
            const confirmMessage = `You have ${unanswered.length} unanswered and ${marked.length} marked question(s).\nDo you still want to submit?`;
            if (window.confirm(confirmMessage)) {
                proceedWithSubmit();
            } else {
                alert("Please review your answers before submitting.");
            }
        } else {
            proceedWithSubmit();
        }
    };
    
    return (
        questions && questions.length > 0 &&
        <>
            {/* Theme Toggle */}
            <Flex justifyContent={"end"}>
                <Button p={0} top={5} variant={"solid"} right={5} onClick={toggleColorMode} mr={2}>
                    {colorMode === 'light' ? <FiMoon /> : <FiSun />}
                </Button>
            </Flex>

            {/* Quiz Layout */}
            <Flex justifyContent={"center"} p={10} pb={{base: 0, xl: 10}}>
                <Card p={10} width={"100%"} maxW={"1376px"} gap={3}>
                    <Text fontSize={"3xl"}>{attempt.title}</Text>
                </Card>
            </Flex>

            <Flex direction={{ base: "column", xl: "row" }} width={"100%"} maxW={"1376px"} p={{base: 10, xl: 0}} mx={"auto"} mb={"200px"}>
                {/* Left Section - Questions */}
                <Flex order={{ base: 3, xl: 1 }} direction={'column'} width={{ base: "100%", xl: "70%"}} pr={{xl: 5}} gap={5}>
                        {questions.map((q) => (
                            <Card key={q.id} p={8} width={"100%"} gap={5}>
                                <Flex justifyContent={'space-between'}>
                                    <Flex gap={5}>
                                        <Text fontWeight={"bold"} fontSize={'xl'}>Question {q.id}</Text>
                                        <Button size={'sm'}>{q.type}</Button>
                                    </Flex>
                                    <Button
                                        rightIcon={<MdBookmark />}
                                        colorScheme={q.isMarked ? 'yellow' : 'gray'}
                                        size={'sm'}
                                        variant={q.isMarked ? "solid" : 'ghost'}
                                        onClick={() => handleMarkForReview(q.id)}
                                    >
                                        Review
                                    </Button>
                                </Flex>
                                <Flex direction={'column'} gap={5}>
                                    <Text>{q.question}</Text>
                                    {q.type === 'mcq' && (
                                        q.options &&
                                        q.options.map((option, index) => (
                                            <Button
                                                key={index}
                                                display="flex"
                                                justifyContent="flex-start"
                                                px={5}
                                                py={8}
                                                width={"100%"}
                                                whiteSpace="normal"
                                                textAlign="left"    
                                                colorScheme={q.answer === option ? "blue" : "gray"}
                                                onClick={() => handleMCQSelect(q.id, option)}
                                            >
                                                {option}
                                            </Button>
                                        ))
                                    )}
                                    {q.type === 'fill' && (
                                        <Input
                                            width="30%"
                                            variant="flushed"
                                            value={q.answer}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        />
                                    
                                    )}
                                    {q.type === 'shortAnswer' && (
                                        <Textarea
                                            p={3}
                                            resize="false"
                                            variant={'filled'}
                                            value={q.answer}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        />
                                    )}
                                    {q.type === 'longAnswer' && (
                                        <Textarea
                                            p={3}
                                            variant={'filled'}
                                            value={q.answer}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        />
                                    )}
                                </Flex>
                            </Card>
                        ))}
                </Flex>

                {/* Divider */}
                <Center order={2} height="auto" display={{ base: "none", xl: "flex" }}>
                    <Divider orientation="vertical" />
                </Center>

                {/* Right Section - Question Numbers & Status */}
                <Flex position={"sticky"} top={"20"} alignSelf={'start'} order={{ base: 1, xl: 3 }} direction={'column'} minW={{base: "100%", xl: "30%"}} px={{xl: 5}} gap={8} pb={{base: 10}}>
                    {isMounted && (
                        <Countdown totalTime={attempt.total_duration * 60} timed={attempt.timed} />
                    )}
                    <Flex wrap="wrap" gap={1}>
                        {questions.map((q) => {
                            let colorScheme = q.isMarked ? 'yellow' : q.isAnswered ? 'blue' : 'gray';
                            return (
                                <Button
                                    key={q.id}
                                    colorScheme={colorScheme}
                                    width="40px"
                                    height="40px"
                                    padding={0}
                                >
                                    {q.id}
                                </Button>
                            );
                        })}
                    </Flex>

                    {/* Legend */}
                    <Flex gap={{base: 10, xl: 3}} width={"100%"} direction={{ base: "row", xl: "column" }}> 
                        <Flex gap={3} align="center">
                            <Button p={0} size="xs" w="25px" h="25px" borderRadius={3} colorScheme="blue" />
                            <Text>Answered</Text>
                        </Flex>
                        <Flex gap={3} align="center">
                            <Button p={0} size="xs" w="25px" h="25px" borderRadius={3} colorScheme="gray" />
                            <Text>Not Answered</Text>
                        </Flex>
                        <Flex gap={3} align="center">
                            <Button p={0} size="xs" w="25px" h="25px" borderRadius={3} colorScheme="yellow" />
                            <Text>Marked for Review</Text>
                            <Box my="auto"><MdBookmark /></Box>
                        </Flex>
                    </Flex>


                    <Button width="100%" colorScheme='green' isLoading={isLoading} onClick={handleSubmit} isDisabled={isLoading}>
                        Submit Test
                    </Button>

                </Flex>
            <Flex
                className={`scroll-to-top ${isVisible ? "show" : "hide"}`}
                position="fixed"
                bottom={10}
                right={10}
                zIndex={10}
            >
                <Button
                    onClick={scrollToTop}
                    className="fade-button"
                    boxShadow="md"
                >
                    <FaAngleUp />
                </Button>
            </Flex>
            </Flex>
        </>
    )
}

export default NewAttempt;
