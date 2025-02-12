import React from "react";
import { Box, Text, VStack, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaFilePdf, FaFileWord, FaFileAlt, FaFileExcel, FaFilePowerpoint, FaFileImage } from "react-icons/fa";

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

const FileList = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box py={2}borderRadius="md" boxShadow="sm">
      <Text px={3} fontSize="sm" fontWeight="bold" mb={2} color={textColor}>
        Project Materials
      </Text>
      <Box align="start" overflowY="auto" h="270px">
        {files.map((file, index) => {
          const { icon, color } = getFileIcon(file.type);
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
