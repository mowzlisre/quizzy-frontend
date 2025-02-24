import { Box, Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaFileAlt, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";

const files = [
  { name: "Course Material.pdf", type: "pdf" },
  { name: "Chapter 2.docx", type: "doc" },
  { name: "Notes.txt", type: "txt" },
];

const getFileIcon = (type) => {
  switch (type) {
    case "pdf":
      return { icon: FaFilePdf, color: "#E53E3E" };
    case "doc":
      return { icon: FaFileWord, color: "#3182CE" };
    case "txt":
      return { icon: FaFileAlt, color: "#718096" };
    case "excel":
      return { icon: FaFileExcel, color: "#38A169" };
    case "ppt":
      return { icon: FaFilePowerpoint, color: "#D69E2E" };
    case "image":
      return { icon: FaFileImage, color: "#DD6B20" };
    default:
      return { icon: FaFileAlt, color: "#718096" };
  }
};

const FileList = ({data}) => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  return (
    data &&
    <Box py={2} borderRadius="md" boxShadow="sm">
      <Flex justifyContent="space-between">
        <Text px={3} fontSize="sm" fontWeight="bold" mb={2} color={textColor}>
          Project Materials
        </Text>
        <Button colorScheme="blue" size={'xs'}>Upload</Button>
      </Flex>
      <Box align="start" overflowY="auto" h="270px">
        {data.map((file, index) => {
          const { icon, color } = getFileIcon(file.file_type);
          return (
            <Button key={index} w="full" size={'sm'} justifyContent="start" leftIcon={<Icon as={icon} boxSize={4} color={color} />} variant="ghost" fontSize={'sm'}>
              {file.name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default FileList;
