import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  useColorModeValue,
  Text,
  Flex,
} from "@chakra-ui/react";

const assessments = [
  {
    id: "A101",
    title: "React Basics",
    created: "3 days ago",
    difficulty: "Easy",
    attempts: 5,
    recentAttempt: "1 day ago",
    status: "Completed",
    avgScore: "87%",
  },
  {
    id: "A102",
    title: "JavaScript Fundamentals",
    created: "1 day ago",
    difficulty: "Medium",
    attempts: 3,
    recentAttempt: "6 hours ago",
    status: "In Progress",
    avgScore: "78%",
  },
  {
    id: "A103",
    title: "HTML & CSS Mastery",
    created: "6 hours ago",
    difficulty: "Hard",
    attempts: 2,
    recentAttempt: "Just now",
    status: "Not Started",
    avgScore: "N/A",
  },
  {
    id: "A104",
    title: "Data Structures",
    created: "5 days ago",
    difficulty: "Hard",
    attempts: 7,
    recentAttempt: "2 days ago",
    status: "Completed",
    avgScore: "92%",
  },
  {
    id: "A105",
    title: "Python for Beginners",
    created: "2 days ago",
    difficulty: "Easy",
    attempts: 4,
    recentAttempt: "10 hours ago",
    status: "In Progress",
    avgScore: "84%",
  },
];

// Function to get the color for difficulty
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "yellow";
    case "Hard":
      return "red";
    default:
      return "gray";
  }
};

// Function to get the color for status
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "green";
    case "In Progress":
      return "blue";
    case "Not Started":
      return "gray";
    default:
      return "gray";
  }
};

const AssessmentTable = ({ project }) => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
      <TableContainer>
        <Table variant="unstyled" size="sm" borderRadius={"lg"}>
          <Thead>
            <Tr height={"50px"}>
              <Th color={textColor}>Assessment ID</Th>
              <Th color={textColor}>Assessment Title</Th>
              <Th color={textColor}>Created</Th>
              <Th color={textColor} textAlign="center">Difficulty</Th>
              <Th color={textColor}>Attempts</Th>
              <Th color={textColor}>Recent Attempt</Th>
              <Th color={textColor}>Status</Th>
              <Th color={textColor}>Avg Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assessments.map((assessment) => (
              <Tr key={assessment.id} role="button">
                <Td>{assessment.id}</Td>
                <Td>{assessment.title}</Td>
                <Td>{assessment.created}</Td>
                <Td textAlign="center">
                  <Tag width="70px" size="sm" colorScheme={getDifficultyColor(assessment.difficulty)}>
                    <Text mx="auto">{assessment.difficulty}</Text>
                  </Tag>
                </Td>
                <Td>{assessment.attempts}</Td>
                <Td>{assessment.recentAttempt}</Td>
                <Td>
                  <Tag size="sm" colorScheme={getStatusColor(assessment.status)}>
                    {assessment.status}
                  </Tag>
                </Td>
                <Td fontWeight="bold">{assessment.avgScore}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
  );
};

export default AssessmentTable;
