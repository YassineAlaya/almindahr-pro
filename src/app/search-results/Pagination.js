"use client";

import { Box, Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageButtons = 5; // Max number of page buttons to display

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Adjust startPage when endPage hits totalPages
    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          colorScheme={currentPage === i ? "teal" : "gray"}
          variant={currentPage === i ? "solid" : "outline"}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Box mt={6}>
      <HStack spacing={4} wrap="wrap" justifyContent="center">
        {/* First Button */}
        <Button 
          onClick={() => handlePageClick(1)} 
          isDisabled={currentPage === 1}
          colorScheme="teal"
        >
          Première
        </Button>

        {/* Previous Button */}
        <Button 
          onClick={handlePrevious} 
          isDisabled={currentPage === 1}
          colorScheme="teal"
        >
          Précédent
        </Button>

        {/* Page Buttons */}
        {currentPage > Math.floor(maxPageButtons / 2) + 1 && <Text>...</Text>}
        {renderPageButtons()}
        {currentPage < totalPages - Math.floor(maxPageButtons / 2) && <Text>...</Text>}

        {/* Next Button */}
        <Button 
          onClick={handleNext} 
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
        >
          Suivant
        </Button>

        {/* Last Button */}
        <Button 
          onClick={() => handlePageClick(totalPages)} 
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
        >
          Dernière
        </Button>
      </HStack>

      <Text mt={4} fontSize="sm" color="gray.600" textAlign="center">
        Page {currentPage} sur {totalPages}
      </Text>
    </Box>
  );
};

export default Pagination;
