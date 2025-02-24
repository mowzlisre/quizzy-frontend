import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProjectDashboard from "./ProjectDashboard";
import AssessmentDashboard from "./AssessmentDashboard";

function Sandbox() {
  const { type, uuid } = useParams(); // Extracts 'p' or 'a' and UUID from the URL

  return (
    <>
      {type === "p" && <ProjectDashboard uuid={uuid} />}
      {type === "a" && <AssessmentDashboard uuid={uuid} />}
      {!["p", "a"].includes(type) && (
        <Flex height="100%" align="center" justify="center">
          <Text fontSize="2xl" color={useColorModeValue("gray.600", "gray.300")}>
            How can I help you?
          </Text>
        </Flex>
      )}
    </>
  );
}

export default Sandbox;
