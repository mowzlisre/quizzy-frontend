import React from "react";
import { FormControl, FormLabel, Textarea, Wrap, WrapItem, Tag, Box, Flex, Text } from "@chakra-ui/react";

const topics = ["React", "JavaScript", "Node.js", "Python", "SQL", "MongoDB"];

const StepConcentration = ({ concentration, setConcentration, additionalInfo, setAdditionalInfo }) => {
  const handleTagClick = (topic) => {
    setConcentration((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  return (
    <FormControl>

      <Flex direction={'column'} gap={5}>
        <Text fontWeight={'bold'} fontSize={'sm'}>You may choose the concentration of the Assessment</Text>
        <Wrap>
          {topics.map((topic) => (
            <WrapItem key={topic}>
              <Tag
                size="md"
                borderRadius={20}
                px={3}
                py={2}
                cursor="pointer"
                variant={concentration.includes(topic) ? "solid" : "outline"}
                colorScheme={concentration.includes(topic) ? "blue" : "gray"}
                onClick={() => handleTagClick(topic)}
              >
                {topic}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>

        <Textarea
          variant={"filled"}
          placeholder="Provide any additional details you would like to add..."
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </Flex>
    </FormControl>
  );
};

export default StepConcentration;
