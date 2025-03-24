import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
  Td,
} from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";

const StepMaterials = ({ materials, setMaterials, apiMaterials }) => {
  const textColor = useColorModeValue("gray.700", "gray.300");

  // Extract selected material IDs
  const selectedIds = materials.map((m) => m.id);

  const timeAgo = (isoString) => {
    const date = parseISO(isoString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleMaterialToggle = (material) => {
    const isSelected = selectedIds.includes(material.id);
    if (isSelected) {
      setMaterials((prev) => prev.filter((m) => m.id !== material.id));
    } else {
      setMaterials((prev) => [...prev, material]);
    }
  };

  const areAllVisibleSelected =
    apiMaterials.length > 0 &&
    apiMaterials.every((m) => selectedIds.includes(m.id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setMaterials(apiMaterials); // Select all
    } else {
      setMaterials([]); // Deselect all
    }
  };

  return (
    <CheckboxGroup>
      <Text mb={2} fontSize={"sm"}>
        Please choose the materials that should be included in the assignment.
        This is important to generate a customized assessment.
      </Text>

      <TableContainer>
        <Table variant="unstyled" size="sm" borderRadius={"lg"}>
          <Thead>
            <Tr height={"50px"}>
              <Th>
                <Checkbox
                  isChecked={areAllVisibleSelected}
                  onChange={handleSelectAll}
                  isDisabled={apiMaterials.length === 0}
                />
              </Th>
              <Th color={textColor}>Material Name</Th>
              <Th color={textColor}>Type</Th>
              <Th color={textColor}>Density</Th>
              <Th color={textColor}>Uploaded</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiMaterials.length !== 0 ? (
              apiMaterials.map((material, id) => {
                const isChecked = selectedIds.includes(material.id);
                let topicsCount = 0;
                try {
                  const tokens = JSON.parse(material.important_tokens || "[]");
                  topicsCount = Array.isArray(tokens)
                    ? tokens.length
                    : Object.keys(tokens).length;
                } catch {
                  topicsCount = 0;
                }

                return (
                  <Tr key={id}>
                    <Td>
                      <Checkbox
                        isDisabled={topicsCount === 0}
                        isChecked={isChecked}
                        onChange={() => handleMaterialToggle(material)}
                      />
                    </Td>
                    <Td>{material.name.substring(0, 15)}...</Td>
                    <Td>{material.file_type.toUpperCase()}</Td>
                    <Td>{topicsCount} Topics</Td>
                    <Td>{timeAgo(material.uploaded_at)}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={5}>
                  <Text>No Materials Available</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </CheckboxGroup>
  );
};

export default StepMaterials;
