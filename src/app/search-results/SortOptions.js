"use client";

import { Box, Select, Text } from "@chakra-ui/react";

const SortOptions = ({ currentSort, onSortChange }) => {
  const handleSortChange = (event) => {
    const newSort = event.target.value;
    
    // Only call onSortChange if the sort order actually changed
    if (newSort !== currentSort) {
      onSortChange(newSort);
    }
  };

  return (
    <Box mb={6}>
      <Text fontSize="lg" mb={2}>
        Trier par :
      </Text>
      <Select
        value={currentSort}
        onChange={handleSortChange}
        placeholder="Sélectionnez une option"
        size="lg"
        bg="white"
        borderColor="lightBlueGray"
        _hover={{ borderColor: "skyBlue" }}
        _focus={{ borderColor: "skyBlue", boxShadow: "0 0 0 1px skyBlue" }}
      >
        <option value="name">Nom (A à Z)</option>
        <option value="name-desc">Nom (Z à A)</option>
        <option value="price">Prix (Croissant)</option>
        <option value="price-desc">Prix (Décroissant)</option>
        <option value="date">Date (Récente)</option>
        <option value="date-desc">Date (Ancienne)</option>
      </Select>
    </Box>
  );
};

export default SortOptions;
