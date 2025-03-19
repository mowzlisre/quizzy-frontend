import React from "react";
import { VStack, Checkbox, CheckboxGroup, Text } from "@chakra-ui/react";

const StepMaterials = ({ materials, setMaterials }) => {
  const handleMaterialChange = (e) => {
    const { value } = e.target;
    console.log(value)

    setMaterials((prevMaterials) => {
      if (prevMaterials.includes(value)) {
        return prevMaterials.filter((item) => item !== value); 
      } else {
        return [...prevMaterials, value];
      }
    });
  };
  return (
    <CheckboxGroup>
      
      <Text mb={6} fontSize={'sm'}>Please choose the materials that should be included in the assignment. This is important to a generate customized assessment</Text>
      <VStack align="start" spacing={4}>
        <Checkbox
          value="PDF"
          onChange={handleMaterialChange}
          isChecked={materials.includes("PDF")}
          gap={2}
        >
          PDF Documents
        </Checkbox>
        <Checkbox
          value="Videos"
          onChange={handleMaterialChange}
          isChecked={materials.includes("Videos")}
          gap={2}
        >
          Video Lectures
        </Checkbox>
        <Checkbox
          value="Articles"
          onChange={handleMaterialChange}
          isChecked={materials.includes("Articles")}
          gap={2}
        >
          Articles
        </Checkbox>
      </VStack>
    </CheckboxGroup>
  );
};

export default StepMaterials;
