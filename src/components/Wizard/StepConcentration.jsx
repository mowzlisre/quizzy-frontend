import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Tag,
  Text,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect } from "react";
import { MdOutlineSync } from "react-icons/md";

const StepConcentration = ({
  concentration,
  setConcentration,
  materials = [],
}) => {
  const maxConcentration = 10;
  const [refreshSeed, setRefreshSeed] = useState(Date.now());
  const [suggestedTopics, setSuggestedTopics] = useState([]);

  const allTopics = useMemo(() => {
    const tokenCounts = {};
    const originalCasingMap = {};

    for (const mat of materials) {
      try {
        const tokens = JSON.parse(mat.important_tokens || "[]");
        const tokenArray = Array.isArray(tokens) ? tokens : Object.keys(tokens);

        tokenArray.forEach((token) => {
          const lower = token.toLowerCase();
          tokenCounts[lower] = (tokenCounts[lower] || 0) + 1;
          if (!originalCasingMap[lower]) {
            originalCasingMap[lower] = token;
          }
        });
      } catch { }
    }

    return Object.entries(tokenCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lower]) => originalCasingMap[lower]);
  }, [materials]);

  useEffect(() => {
    const unselected = allTopics.filter((t) => !concentration.includes(t));
    const shuffled = [...unselected].sort(() => 0.5 - Math.random());
    setSuggestedTopics(shuffled.slice(0, 10));
  }, [refreshSeed, allTopics]);

  const toggleTopic = (topic) => {
    if (concentration.includes(topic)) {
      setConcentration((prev) => prev.filter((item) => item !== topic));
    } else if (concentration.length < maxConcentration) {
      setConcentration((prev) => [...prev, topic]);
    }
  };

  const refreshSuggestions = () => {
    setRefreshSeed(Date.now());
  };

  return (
    <FormControl>
      <Flex direction="column" gap={5}>
        <Text fontWeight="bold" fontSize="sm">
          Select up to {maxConcentration} concentrations in the Assessment ({allTopics.length})
        </Text>

        {concentration.length > 0 && (
          <Box>
            <Text fontSize="sm" mb={2} fontWeight="medium">
              Selected Topics ({concentration.length}/{maxConcentration})
            </Text>
            <Wrap>
              {concentration.map((topic) => (
                <WrapItem key={topic}>
                  <Tag
                    size="md"
                    borderRadius={20}
                    px={3}
                    py={2}
                    variant="solid"
                    colorScheme="blue"
                    cursor="pointer"
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        <HStack justify="space-between">
          <Text fontSize="sm" fontWeight="medium">
            Suggested Topics
          </Text>
          <Button gap={2} onClick={refreshSuggestions} size="sm">
            <Text my="auto" fontSize="xs">
              Refresh Topics
            </Text>
            <Box my="auto">
              <MdOutlineSync fontSize={16} />
            </Box>
          </Button>
        </HStack>

        <Wrap>
          {suggestedTopics
            .filter((topic) => !concentration.includes(topic))
            .map((topic) => {
              const isDisabled = concentration.length >= maxConcentration;
              return (
                <WrapItem key={topic}>
                  <Tag
                    size="md"
                    borderRadius={20}
                    px={3}
                    py={2}
                    cursor={isDisabled ? "not-allowed" : "pointer"}
                    variant="outline"
                    colorScheme={isDisabled ? "gray" : "gray"}
                    opacity={isDisabled ? 0.5 : 1}
                    onClick={() => {
                      if (!isDisabled) toggleTopic(topic);
                    }}
                  >
                    {topic}
                  </Tag>
                </WrapItem>
              );
            })}
        </Wrap>
      </Flex>
    </FormControl>
  );
};

export default StepConcentration;
