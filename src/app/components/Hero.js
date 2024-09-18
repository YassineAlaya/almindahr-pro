"use client";

import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import SearchBar from "../search-results/Searchbar"; // Import the SearchBar component

export default function Hero() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgGradient="linear(to-b, lightGray, white)"
      color="darkCharcoal"
      minH="80vh"
      px={4}
      py={12}
      boxShadow="lg"
    >
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        fontWeight="bold"
        letterSpacing="wider"
      >
        Trouvez les meilleurs professionnels pour votre maison en Tunisie
      </Heading>
      <Text
        fontSize="xl"
        mb={10}
        maxW="700px"
      >
        Recherchez des architectes, des électriciens, des plombiers et plus encore !
      </Text>

      <Box w="full" maxW="800px" mb={10}>
        <SearchBar /> {/* Use the SearchBar component directly here */}
      </Box>
    </Flex>
  );
}
