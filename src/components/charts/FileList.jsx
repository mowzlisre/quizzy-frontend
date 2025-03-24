import {
  Alert, AlertIcon,
  Box, Button, Flex, Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text, useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaFileAlt, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { materialDelete, materialUpload } from "../../api"; 
import { FiAlertTriangle } from "react-icons/fi";

const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB

const getFileIcon = (type) => {
  switch (type) {
    case "pdf":
      return { icon: FaFilePdf, color: "#E53E3E" };
    case "doc":
    case "docx":
      return { icon: FaFileWord, color: "#3182CE" };
    case "txt":
      return { icon: FaFileAlt, color: "#718096" };
    case "xls":
    case "xlsx":
      return { icon: FaFileExcel, color: "#38A169" };
    case "ppt":
    case "pptx":
      return { icon: FaFilePowerpoint, color: "#D69E2E" };
    case "image":
      return { icon: FaFileImage, color: "#DD6B20" };
    default:
      return { icon: FaFileAlt, color: "#718096" };
  }
};

const FileList = ({ data, refreshFiles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "gray.300");
  const toast = useToast();
  
  const [uuid, setUuid] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const url = window.location.pathname;
    const uuidFromUrl = url.split("/").pop();
    setUuid(uuidFromUrl);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = [...files, ...acceptedFiles];
  
    const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);
  
    if (newFiles.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
  
    if (totalSize > MAX_TOTAL_SIZE) {
      setError("Total file size exceeds 100MB.");
      return;
    }
  
    setFiles(newFiles);  // ✅ Appends to current list
    setError("");
  }, [files]);
  
  const removeFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };
  const handleUpload = async () => {
    setUploading(true)
    if (files.length === 0) {
      setError("No files selected.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await materialUpload(uuid, formData);
      if (response.data.status === "success") {
        setFiles([]);
        onClose();
        toast({
          title: "Upload Successful!",
          status: "success",
          duration: 3000
        });

        refreshFiles();
      } else {
        setError("File Parsing failed.");
        toast({
          title: "Upload Failed",
          status: "error",
          duration: 3000
        });
      }
    } catch (error) {
      setError("Upload failed. Please try again.");
      toast({
        title: "Upload Failed",
        status: "error",
        duration: 3000
      });
    }
    setUploading(false)
  };

  const handleDelete = async (id) => {
    try {
      const response = await materialDelete(uuid, id);
      if (response.data.status === "success") {
        toast({
          title: "File Deleted",
          status: "success",
          duration: 3000
        });

        refreshFiles(); 
      } else {
        toast({
          title: "Delete Failed",
          status: "error",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        status: "error",
        duration: 3000
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "text/plain": [".txt"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
    },
    onDropRejected: () => setError("Invalid file type."),
  });
  

  return (
    <Box py={2} borderRadius="md" boxShadow="sm">
      <Flex justifyContent="space-between">
        <Text px={3} fontSize="sm" fontWeight="bold" mb={2} color={textColor}>
          Project Materials
        </Text>
        <Button colorScheme="blue" size="xs" onClick={onOpen}>Upload</Button>
      </Flex>
      <Box align="start" overflowY="auto" h="270px">
        {data && data.map((file, index) => {
          const { icon, color } = getFileIcon(file.file_type);
          return (
            <Button key={index} w="full" size="sm" justifyContent="start"
              leftIcon={<Icon as={icon} boxSize={4} color={color} />}
              variant="ghost" fontSize="sm">
              <Flex width={"100%"} justifyContent={'space-between'}>
                <Text my={'auto'}>{file.name.substring(0,15)}...</Text>
                <Box gap={3} display={'flex'} onClick={() => handleDelete(file.id)} cursor="pointer" _hover={{ color: "red.500" }}>
                  <Box my={'auto'}>
                    {
                      JSON.parse(file.important_tokens || "[]").length === 0 &&
                      <FiAlertTriangle color="orange" />
                    }
                  </Box>
                  <MdDeleteOutline color="gray.400" fontSize={20} />
                </Box>
              </Flex>
            </Button>
          );
        })}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={8}>
            <Flex gap={3} direction={'column'} my={3}>
              <Text fontSize={'xl'}>Upload Materials here</Text>
              <Text fontSize={'sm'}>The materials you upload here will be used to generate assessments.</Text>
            </Flex>

            {error && (
              <Alert status="error" mb={3}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Box {...getRootProps()} p={6} border="2px dashed gray" borderRadius="md"
              textAlign="center" cursor="pointer" mb={4}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Text color="blue.500">Drop the files here...</Text>
              ) : (
                <Text>Drag & Drop files here, or click to select</Text>
              )}
              <Icon as={AiOutlineCloudUpload} boxSize={10} mt={3} color="gray.500" />
            </Box>

            {files.length > 0 && (
              <Box border="1px solid #eee" borderRadius="md" p={3} mb={4}>
                <Text mb={2} fontWeight="bold">Files to Upload:</Text>
                {files.map((file, index) => {
                  const ext = file.name.split('.').pop().toLowerCase();
                  const { icon, color } = getFileIcon(ext);
                  return (
                    <Flex key={index} justify="space-between" align="center" mb={2}>
                      <Flex align="center" gap={2}>
                        <Icon as={icon} color={color} />
                        <Text fontSize="sm">{file.name}</Text>
                      </Flex>
                      <Box onClick={() => removeFile(index)} gap={3} cursor="pointer" _hover={{ color: "red.500" }}>
                        <MdDeleteOutline fontSize={20} />
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
            )}
            <Flex mt={4} justifyContent="space-between">
              <Button size={"sm"} onClick={onClose}>Cancel</Button>
              <Button size={"sm"} colorScheme="blue" onClick={handleUpload} isLoading={uploading} isDisabled={files.length === 0}>
                Upload
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FileList;
