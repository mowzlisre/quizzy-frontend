import React, { useState } from "react";
import { Box, FormControl, Input, Text } from "@chakra-ui/react";

const StepTitle = ({ title, setTitle, allowNext }) => {
  const MAX_LENGTH = 256;
  const VALID_PATTERN = /^[a-zA-Z0-9_\-.\s]*$/; // Only Alphanumerics, _, -, .

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > MAX_LENGTH) {
      return; // Prevent typing beyond limit
    }

    if (!VALID_PATTERN.test(inputValue)) {
      setError("Only letters, numbers, _, -, and . are allowed.");
    } else {
      setError(""); // Clear error if valid
      setTitle(inputValue);
    }
  };

  return (
    <FormControl>
      <Input
        variant="flushed"
        placeholder="Give a title for your Assignment"
        value={title}
        fontSize="sm"
        onChange={handleChange}
        isInvalid={error}
        autoComplete="off"
      />
      <Box px={5} pt={2}>
        <Text textAlign={'end'} fontSize="xs" color={title.length === MAX_LENGTH ? "red.500" : "gray.500"} mt={1}>
          {title.length}/{MAX_LENGTH} characters used
        </Text>
        <Text mt={2} textAlign="justify" fontSize="xs">
          Giving a title to your assignment is important. To organize well, try giving a title that is well-structured.
          <br />
          <strong>Example:</strong> <em>DATS_6104 - Warehousing.Principles</em>
        </Text>
        {error && <Text fontSize="xs" color="red.500" mt={1}>{error}</Text>}
      </Box>

    </FormControl>
  );
};

export default StepTitle;
