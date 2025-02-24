import { Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { projectAssessmentsViewAPI } from "../../api";
import { useNavigate } from "react-router-dom";

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

const AssessmentTable = ({ uuid }) => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const [assessments, setAssessments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      if(uuid){
          const fetchAssessments = async () => {
          try {
              const response = await projectAssessmentsViewAPI(uuid);
              setAssessments(response.data);
          } catch (error) {
              console.error("Error fetching projects:", error);
          }
          };
      
          fetchAssessments();
      }
    }, [uuid]);

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
              <Tr key={assessment.assessment_id} role="button" onClick={() => navigate(`/a/${assessment.id}`)}>
                <Td>{assessment.assessment_id}</Td>
                <Td>
                  <Text isTruncated maxWidth="90%"noOfLines={1}display="block" whiteSpace="nowrap"overflow="hidden"textOverflow="ellipsis">
                    {assessment.assessment_title}
                  </Text>
                </Td>
                <Td>{assessment.created}</Td>
                <Td textAlign="center">
                  <Tag width="70px" size="sm" colorScheme={getDifficultyColor(assessment.difficulty)}>
                    <Text mx="auto">{assessment.difficulty}</Text>
                  </Tag>
                </Td>
                <Td>{assessment.attempts.length}</Td>
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
