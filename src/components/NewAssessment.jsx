import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepSeparator,
  StepIcon,
  useSteps,
  Card,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import StepTitle from "./Wizard/StepTitle";
import StepMaterials from "./Wizard/StepMaterials";
import StepConcentration from "./Wizard/StepConcentration";
import StepQuestions from "./Wizard/StepQuestions";
import { createNewAssessment, handleAPIErrors, projectViewAPI } from "../api";

const steps = [
  { title: "Title", component: StepTitle },
  { title: "Materials", component: StepMaterials },
  { title: "Concentration", component: StepConcentration },
  { title: "Questions", component: StepQuestions },
];

const NewAssessment = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });

  // Form States
  const [title, setTitle] = useState("");
  const [apiMaterials, setApiMaterials] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [concentration, setConcentration] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({ mcq: 0, fill: 0, shortAnswer: 0, longAnswer: 0 });
  const [valid, setValid] = useState(false);

  // Handle Step Navigation
  const nextStep = () => activeStep < steps.length - 1 && setActiveStep(activeStep + 1);
  const prevStep = () => activeStep > 0 && setActiveStep(activeStep - 1);
  const [isLoading, setIsLoading] = useState(false);
  // Handle Form Submission
  const handleSubmit = async () => {
    const materialUUIDs = materials.map((mat) => mat.id);
  
    const assessmentData = {
      uuid,
      title,
      materials: materialUUIDs,
      concentration,
      questionCounts,
    };
    console.log(assessmentData)
    try {
      setIsLoading(true);
      const response = await createNewAssessment(assessmentData);
      const responseData = response.data;
  
      setIsLoading(false);
  
      if (responseData.status === "success") {
        navigate(-1);
      } else {
        alert("Assessment creation failed: " + (responseData.error || "Unknown error"));
      }
    } catch (error) {
      setIsLoading(false);
      handleAPIErrors(error, navigate);
    }
  };
  


  const fetchProjects = async () => {
    try {
      const response = await projectViewAPI(uuid);
      setApiMaterials(response.data.materials);
    } catch (error) {
      handleAPIErrors(error, navigate)
    }
  };

  useEffect(() => {
    fetchProjects()
  }, [])

  const ActiveStepComponent = steps[activeStep].component;

  useEffect(() => {
    if (activeStep === 0) {
      setValid(title.trim().length >= 10);
    } else if (activeStep === 1) {
      setValid(materials.length > 0);
    } else {
      setValid(true);
    }
  }, [title, materials, activeStep]);


  return (
    <Box p={6} mx="auto">
      <Card p={10} gap={2}>
        <Heading size="md" mb={6}>Create a New Assessment</Heading>

        <Stepper w={"300px"} size="sm" index={activeStep} colorScheme="blue">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box maxW={"600px"} mt={6}>
          <ActiveStepComponent
            title={title} setTitle={setTitle} apiMaterials={apiMaterials}
            materials={materials} setMaterials={setMaterials}
            concentration={concentration} setConcentration={setConcentration}
            questionCounts={questionCounts} setQuestionCounts={setQuestionCounts}
          />
        </Box>

        <HStack justify="space-between" mt={6}>
          <Button isDisabled={activeStep === 0} onClick={prevStep}>Back</Button>
          {activeStep === steps.length - 1 ? (
            <Button colorScheme="green" onClick={handleSubmit} isDisabled={!valid} isLoading={isLoading}>Submit</Button>
          ) : (
            <Button colorScheme="blue" onClick={nextStep} isDisabled={!valid}>Next</Button>
          )}
        </HStack>
      </Card>
    </Box>
  );
};

export default NewAssessment;
