"use client";

import { Box, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FaRedoAlt } from "react-icons/fa";

const NoResults = ({ onRetry }) => {
  return (
    <Box
      textAlign="center"
      p={8}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      mt={6}
      transition="all 0.3s"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
    >
      <Heading as="h2" size="lg" mb={4}>
        Aucune Résultat Trouvé
      </Heading>
      <Text fontSize="lg" mb={6} color="gray.600">
        Désolé, nous n'avons trouvé aucun professionnel correspondant à votre recherche.
        Essayez de modifier vos filtres ou réessayez votre recherche.
      </Text>
      <Button
        leftIcon={<FaRedoAlt />}
        colorScheme="teal"
        variant="solid"
        onClick={onRetry}
        transition="all 0.2s"
        _hover={{ bg: "teal.600" }}
        size="lg"
        px={8}
      >
        Réessayer
      </Button>
    </Box>
  );
};

export default NoResults;
