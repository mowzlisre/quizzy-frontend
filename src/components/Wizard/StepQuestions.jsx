import React from "react";
import { FormControl, FormLabel, HStack, IconButton, Text } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

// Question types with short form as key and full name as display label
const questionTypes = [
  ["mcq", "Multiple Choice Questions"],
  ["maq", "Multiple Answer Questions"],
  ["shortAnswer", "Short Answer Questions"],
  ["longAnswer", "Long Answer Questions"],
];

const StepQuestions = ({ questionCounts, setQuestionCounts }) => {
  const handleIncrement = (key) => {
    setQuestionCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const handleDecrement = (key) => {
    setQuestionCounts((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? prev[key] - 1 : 0, // Prevent negative values
    }));
  };

  return (
    <FormControl>
      {questionTypes.map(([key, label]) => (
        <HStack key={key} minW={"500px"} justify="space-between" p={2}>
          <FormLabel m={0} fontSize="sm">
            {label}
          </FormLabel>
          <HStack>
            <IconButton
              size="sm"
              icon={<FaMinus />}
              onClick={() => handleDecrement(key)}
              isDisabled={questionCounts[key] === 0}
              aria-label={`Decrease ${key}`}
            />
            <Text minW="30px" textAlign="center">
              {questionCounts[key]}
            </Text>
            <IconButton
              size="sm"
              icon={<FaPlus />}
              onClick={() => handleIncrement(key)}
              aria-label={`Increase ${key}`}
            />
          </HStack>
        </HStack>
      ))}
    </FormControl>
  );
};

export default StepQuestions;
