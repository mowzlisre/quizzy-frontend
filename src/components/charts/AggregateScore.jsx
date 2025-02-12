import React from "react";
import { Box, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AggregateScore = ({ value, label }) => {
  const textColor = useColorModeValue("#3182ce", "#90cdf4"); // Light: blue, Dark: lighter blue
  const pathColor = useColorModeValue("#3182ce", "#90cdf4");
  const trailColor = useColorModeValue("#e2e8f0", "#2d3748"); // Light: light gray, Dark: dark gray

  return (
    <Box textAlign="center">
      {/* Circular Progress Bar */}
      <Box 
        mx="auto"
        position="relative"
        w="150px" 
        h="150px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgressbar
          value={value}
          strokeWidth={5}
          styles={buildStyles({
            textColor,
            pathColor,
            trailColor,
            strokeLinecap: "butt",
            textSize: "16px",
          })}
        />
        <Box position="absolute" textAlign="center">
          <Text fontSize="xl" fontWeight="bold">{value}</Text>
          <Text fontSize="sm">{label}</Text>
        </Box>
      </Box>

      {/* Additional Score Information */}
      <Box mt={5}>
        <Text fontSize={"xs"} fontWeight="bold">Your top 3 scores</Text>
        <HStack px={2} mt={2} justifyContent="space-between" fontSize="sm">
          <Text>Project 1</Text>
          <Text>78.9</Text>
        </HStack>
        <HStack color="teal" fontWeight="bold" px={2} mt={2} justifyContent="space-between" fontSize="sm">
          <Text>Project 2</Text>
          <Text>88.1</Text>
        </HStack>
        <HStack px={2} mt={2} justifyContent="space-between" fontSize="sm">
          <Text>Project 3</Text>
          <Text>86.7</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default AggregateScore;
