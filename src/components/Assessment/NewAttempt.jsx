import { Box, Button, Card, Center, Divider, Flex, Input, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import { MdBookmark } from 'react-icons/md';
import "@/index.css"
import Countdown from './CountDown';

// Sample Questions
const initialQuestions = [
    { id: 1, type: 'MCQ', question: 'Which SQL clause filters results before grouping?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: '', isAnswered: false, isMarked: false },
    { id: 2, type: 'FillUp', question: 'The _answer_ constraint ensures uniqueness.', answer: '', isAnswered: false, isMarked: false },
    { id: 3, type: 'ShortAnswer', question: 'What is the difference between PRIMARY KEY and UNIQUE KEY?', answer: '', isAnswered: false, isMarked: false },
    { id: 4, type: 'Essay', question: 'Explain different types of SQL joins with examples.', answer: '', isAnswered: false, isMarked: false }
];

const NewAttempt = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [questions, setQuestions] = useState(initialQuestions);

    useEffect(() => {
        const enterFullScreen = () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                document.documentElement.msRequestFullscreen();
            }
        };

        enterFullScreen();

        // Optional: Exit fullscreen automatically when component unmounts
        return () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        };
    }, []);

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

    const handleSubmit = () => {
        const unansweredQuestions = questions.filter(q => !q.isAnswered);
        const markedQuestions = questions.filter(q => q.isMarked);
    
        if (unansweredQuestions.length > 0 || markedQuestions.length > 0) {
            let message = `You have ${unansweredQuestions.length} unanswered question(s) and ${markedQuestions.length} marked question(s).\nDo you want to submit anyway?`;
    
            if (window.confirm(message)) {
                console.log("Quiz Submitted:", questions);
                alert("Your attempt has been submitted!");
            } else {
                alert("Please review your answers before submitting.");
            }
        } else {
            console.log("Quiz Submitted:", questions);
            alert("Your attempt has been submitted successfully!");
        }
    };

    
    return (
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
                    <Text fontSize={"3xl"}>MongoDB Introduction</Text>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint atque, perspiciatis dignissimos dolore animi consequuntur rerum harum enim, pariatur, perferendis placeat iste commodi doloribus optio totam minima ullam molestiae accusamus!</p>
                </Card>
            </Flex>

            <Flex direction={{ base: "column", xl: "row" }} width={"100%"} maxW={"1376px"} p={{base: 10, xl: 0}} mx={"auto"} mb={"200px"}>
                {/* Left Section - Questions */}
                <Flex order={{ base: 3, xl: 1 }} direction={'column'} width={{ base: "100%", xl: "70%"}} pr={{xl: 5}} gap={5}>
                        {questions.map((q) => (
                            <Card key={q.id} p={8} width={"100%"} gap={5}>
                                <Flex justifyContent={'space-between'}>
                                    <Flex gap={5}>
                                        <Text fontSize={'xl'}>Question {q.id}</Text>
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
                                    {q.type !== 'FillUp' &&
                                    <Text>{q.question}</Text>
                                    }               
                                    {q.type === 'MCQ' && (
                                        q.options.map((option, index) => (
                                            <Button
                                                key={index}
                                                display="flex"
                                                justifyContent="flex-start"
                                                px={5}
                                                py={8}
                                                width={"100%"}
                                                colorScheme={q.answer === option ? "blue" : "gray"}
                                                onClick={() => handleMCQSelect(q.id, option)}
                                            >
                                                {option}
                                            </Button>
                                        ))
                                    )}
                                    {q.type === 'FillUp' && (
                                        <Text>
                                            {(() => {
                                                // Split the question at the placeholder '_answer_'
                                                let chunks = q.question.split('_answer_');
                                        
                                                return (
                                                    <>
                                                        {chunks[0]}
                                                        <Input
                                                            width="20%"
                                                            textAlign="center"
                                                            variant="flushed"
                                                            value={q.answer}
                                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                                        />
                                                        {chunks[1]}
                                                    </>
                                                );
                                            })()}
                                        </Text>
                                    
                                    )}
                                    {q.type === 'ShortAnswer' && (
                                        <Textarea
                                            p={3}
                                            resize={false}
                                            variant={'filled'}
                                            value={q.answer}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        />
                                    )}
                                    {q.type === 'Essay' && (
                                        <Textarea
                                            p={3}
                                            resize={false}
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
                    <Countdown/>
                    <Flex wrap="wrap" gap={1}>
                        {questions.map((q) => {
                            let colorScheme = q.isMarked ? 'yellow' : q.isAnswered ? 'green' : 'gray';
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


                    <Button width="100%" colorScheme='green'  onClick={handleSubmit}>Submit Test</Button>
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
