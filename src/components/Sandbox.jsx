import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProjectDashboard from "./ProjectDashboard";
import AssessmentDashboard from "./AssessmentDashboard";
import AtemptAnalytics from "./AttemptAnalytics";

function Sandbox() {
  const { type, uuid } = useParams();

  return (
    <>
      {type === "p" && <ProjectDashboard uuid={uuid} />}
      {type === "a" && <AssessmentDashboard uuid={uuid} />}
      {type === "t" && <AtemptAnalytics uuid={uuid} />}
      {!["p", "a", "t"].includes(type) && (
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
