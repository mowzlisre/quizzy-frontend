import React from "react";
import { Box, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AggregateScore = ({ value, label, data }) => {
  const textColor = useColorModeValue("#3182ce", "#90cdf4"); // Light: blue, Dark: lighter blue
  const pathColor = useColorModeValue("#3182ce", "#90cdf4");
  const trailColor = useColorModeValue("#e2e8f0", "#2d3748"); // Light: light gray, Dark: dark gray

  return (
    <Box textAlign="center">
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
        { data && data.length > 0 &&
          data.map((item, index) => (
            <HStack key={index} px={2} mt={2} justifyContent="space-between" fontSize="sm">
              <Text>{item.name}</Text>
              <Text>{item.score}</Text>
            </HStack>
          ))
        }
      </Box>
    </Box>
  );
};

export default AggregateScore;
