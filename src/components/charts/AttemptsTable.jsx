import { Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";



const AttemptsTable = ({ data }) => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const navigate = useNavigate()
  function getPerformanceRating(attempt) {
    if (attempt.max_score === 0) return { rating: "Invalid Score", colorScheme: "gray" }; // Prevent division by zero
  
    const perc = (attempt.attempt_score / attempt.max_score) * 100;
  
    if (perc > 95) return { rating: "Excellent", colorScheme: "green" };
    if (perc > 90) return { rating: "Very Good", colorScheme: "teal" };
    if (perc > 80) return { rating: "Good", colorScheme: "blue" };
    if (perc > 70) return { rating: "Fair", colorScheme: "yellow" };
    if (perc > 50) return { rating: "Attention Required", colorScheme: "orange" };
    return { rating: "Poor", colorScheme: "red" };
  }
  return (
      <TableContainer>
        <Table variant="unstyled" size="sm" borderRadius={"lg"}>
          <Thead>
            <Tr height={"50px"}>
              <Th color={textColor}>Attempt ID</Th>
              <Th color={textColor}>Attempt Score</Th>
              <Th color={textColor}>Max Score</Th>
              <Th color={textColor}>Created</Th>
              <Th color={textColor}>Feedback</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((attempt) => (
              <Tr key={attempt.id} role="button" onClick={() => navigate(`/t/${attempt.id}`)}>
                <Td>{attempt.id.slice(0,15)}...</Td>
                <Td>{attempt.attempt_score}</Td>
                <Td>{attempt.max_score}</Td>
                <Td>{attempt.created}</Td>
                <Td>
                  <Tag size="sm" width="85px" colorScheme={getPerformanceRating(attempt).colorScheme}>
                    <Text mx={'auto'}>{getPerformanceRating(attempt).rating}</Text>
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
  );
};

export default AttemptsTable;
