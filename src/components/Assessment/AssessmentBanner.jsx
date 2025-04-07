import React, { useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    Card,
    Container
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const AssessmentBanner = () => {
    const location = useLocation();
    const attempt = location.state?.attempt;
    const navigate = useNavigate();
    localStorage.setItem("attempt_meta", JSON.stringify(attempt))
    useEffect(() => {
        if (!attempt) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                navigate(-1);
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [attempt, navigate]);


    if (!attempt) {
        return (
            <Container maxW="xl" mt={10}>
                <Card borderRadius="xl" p={6} shadow="md" textAlign="center">
                    <Text fontSize="lg" fontWeight="medium">
                        ❗ No attempt data found. Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
                    </Text>
                </Card>
            </Container>
        );
    }

    const {
        id,
        uuid,
        max_score,
        timed,
        total_duration,
        partial_credits,
        negative_score,
        proctored
    } = attempt;
    const desc = `This is a ${proctored ? 'proctored' : 'non-proctored'}, ` +
        `${timed ? 'timed' : 'untimed'} assessment with ` +
        `${partial_credits ? 'partial scoring enabled' : 'partial scoring disabled'} ` +
        `and ${negative_score ? 'negative marking enabled' : 'no negative marking'}.`;

 
    return (
        <Container maxW="xl" mt={10}>
            <Card borderRadius="xl" p={6} shadow="md">
                <Text fontSize="2xl" fontWeight="bold" mb={3}>
                    Assessment Overview
                </Text>

                <Text fontSize="md" mb={2}>
                    {desc}
                </Text>

                <Text fontSize="md" mb={2}>
                    ⏱ Duration:  {
                        attempt.timed ?
                        <>{total_duration} minutes</>
                        : "N/A"
                    } 
                </Text>

                <Text fontSize="md" mb={4}>
                    🎯 Max Score: {max_score} points
                </Text>

                <Button colorScheme="teal" size="lg" width="100%" onClick={() => {navigate(`/n/${id}`); localStorage.setItem('uuid', uuid)}}>
                    Start Attempt
                </Button>
            </Card>
        </Container>
    );
};

export default AssessmentBanner;
