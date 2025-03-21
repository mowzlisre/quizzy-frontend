import "@/index.css";
import { Button, Card, Center, Divider, Flex, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const initialQuestions = [
    { id: 1, type: 'MCQ', question: 'Which SQL clause filters results before grouping?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], userAnswer: 'WHERE', correctAnswer: 'WHERE' },
    { id: 2, type: 'FillUp', question: 'The _answer_ constraint ensures uniqueness.', userAnswer: 'UNIQUE', correctAnswer: 'UNIQUE' },
    { id: 3, type: 'ShortAnswer', question: 'What is the difference between PRIMARY KEY and UNIQUE KEY?', userAnswer: 'Primary Key uniquely identifies rows.', correctAnswer: 'Primary Key ensures uniqueness and cannot be NULL. UNIQUE KEY also ensures uniqueness but allows NULL values.' },
    { id: 4, type: 'Essay', question: 'Explain different types of SQL joins with examples.', userAnswer: 'SQL Joins are used to combine rows...', correctAnswer: 'SQL Joins include INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, and CROSS JOIN...' },
    { id: 5, type: 'MCQ', question: 'Which command is used to remove a table in SQL?', options: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'], userAnswer: 'DROP', correctAnswer: 'DROP' },
    { id: 6, type: 'FillUp', question: 'The _answer_ keyword sorts results in descending order.', userAnswer: 'DESC', correctAnswer: 'DESC' },
    { id: 7, type: 'ShortAnswer', question: 'What is the purpose of the SQL INDEX?', userAnswer: 'Speeds up search queries.', correctAnswer: 'An INDEX speeds up search queries by reducing the number of rows scanned.' },
    { id: 8, type: 'Essay', question: 'Describe the ACID properties in a database.', userAnswer: 'ACID stands for...', correctAnswer: 'ACID stands for Atomicity, Consistency, Isolation, and Durability...' }
];

const AtemptAnalytics = () => {
    const [questions, setQuestions] = useState(initialQuestions);

    return (
        <>
            <Flex direction={"column"} width={"100%"} overflowY={"auto"} gap={5} p={5}>
                <Flex justifyContent={"center"} pb={0}>
                    <Card p={10} width={"100%"} gap={3}>
                        <Text fontSize={"3xl"}>Attempt Analytics</Text>
                        <p>Review your answers and compare them with the correct ones.</p>
                    </Card>
                </Flex>

                <Flex width={"100%"} gap={5}>
                    <Flex direction={'column'} width={{ base: "100%", xl: "70%"}}gap={5}>
                    {questions.map((q) => (
                        <Card key={q.id} p={8} width={"100%"} gap={5}>
                            <Flex justifyContent={'space-between'}>
                                <Flex gap={5}>
                                    <Text fontSize={'xl'}>Question {q.id}</Text>
                                    <Button size={'sm'}>{q.type}</Button>
                                </Flex>
                            </Flex>
                            <Flex direction={'column'} gap={5}>
                                <Text>{q.question}</Text>
                                {q.type === 'MCQ' && (
                                    q.options.map((option, index) => (
                                        <Button
                                            key={index}
                                            display="flex"
                                            justifyContent="flex-start"
                                            px={5}
                                            py={8}
                                            width={"100%"}
                                            colorScheme={q.userAnswer === option ? (q.userAnswer === q.correctAnswer ? "green" : "red") : "gray"}
                                        >
                                            {option}
                                        </Button>
                                    ))
                                )}
                                {q.type !== 'MCQ' && (
                                    <Textarea
                                        p={3}
                                        resize="false"
                                        variant={'filled'}
                                        value={q.userAnswer}
                                        isReadOnly
                                    />
                                )}
                                <Flex alignItems="center" gap={3}>
                                    {q.userAnswer === q.correctAnswer ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                                    <Text color={q.userAnswer === q.correctAnswer ? "green.500" : "red.500"}>
                                        {q.userAnswer === q.correctAnswer ? "Correct Answer" : "Incorrect Answer"}
                                    </Text>
                                </Flex>
                                <Text fontSize={'sm'} color={'gray.500'}>Correct Answer: {q.correctAnswer}</Text>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
                    <Flex position={"sticky"} top={"20"} alignSelf={'start'} order={{ base: 1, xl: 3 }} direction={'column'} minW={{base: "100%", xl: "30%"}}  gap={8} pb={{base: 10}}>
                        
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default AtemptAnalytics;
