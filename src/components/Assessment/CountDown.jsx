import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const Countdown = ({ totalTime = 3600, onTimeUp }) => {  // Default 1 hour (3600s)
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp(); // Callback when time reaches 0
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [timeLeft, onTimeUp]);

    // Convert seconds into HH:MM:SS format
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours > 0 ? String(hours).padStart(2, "0") : null, // Show hours only if > 0
            minutes > 0 ? String(minutes).padStart(2, "0") : "00", // Always show minutes
            String(secs).padStart(2, "0") // Always show seconds
        ].filter(Boolean).join(":"); // Remove null values
    };

    return (
        <Box textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color={timeLeft > totalTime * 0.7 ? "green.500" : "red.500"}>
                {formatTime(timeLeft)} Remaining
            </Text>
            <Text fontStyle="italic" fontSize="sm">
                The test will automatically be submitted once the timer stops
            </Text>
        </Box>
    );
};

export default Countdown;
