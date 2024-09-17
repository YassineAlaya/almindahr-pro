"use client";

import {
  Heading,
  Text,
  Input,
  Button,
  Box,
  Flex,
  Stack,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearchLocation, FaUserTie } from "react-icons/fa";

export default function Hero() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="lightGray"
      color="darkCharcoal"
      minH="80vh"
      px={4}
      py={12}
    >
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        fontWeight="bold"
        letterSpacing="wider"
        lineHeight="1.2"
        fontFamily="Poppins, sans-serif"
      >
        Trouvez les meilleurs professionnels pour votre maison en Tunisie
      </Heading>
      <Text
        fontSize="xl"
        mb={10}
        maxW="700px"
        color="slateGray"
        fontFamily="Nunito Sans, sans-serif"
      >
        Recherchez des architectes, des électriciens, des plombiers et plus encore !
      </Text>
      <Box w="full" maxW="800px" mb={10}>
        <HStack
          spacing={0}
          w="full"
          bg="white"
          borderRadius="full"
          boxShadow="lg"
          overflow="hidden"
        >
          <InputGroup flex="1" border="none">
            <InputLeftElement pointerEvents="none" color="gray.400">
              <FaUserTie />
            </InputLeftElement>
            <Input
              placeholder="Profession"
              size="lg"
              focusBorderColor="transparent"
              border="none"
              _hover={{ borderColor: "transparent" }}
              _focus={{ borderColor: "transparent" }}
              _placeholder={{ color: "gray.500" }}
              borderRadius="none"
            />
          </InputGroup>
          <InputGroup flex="1" border="none">
            <InputLeftElement pointerEvents="none" color="gray.400">
              <FaSearchLocation />
            </InputLeftElement>
            <Input
              placeholder="Localisation"
              size="lg"
              focusBorderColor="transparent"
              border="none"
              _hover={{ borderColor: "transparent" }}
              _focus={{ borderColor: "transparent" }}
              _placeholder={{ color: "gray.500" }}
              borderRadius="none"
            />
          </InputGroup>
          <Button
            size="lg"
            bg="mintGreen"
            color="gray.500"
            borderRadius="0"
            _hover={{ bg: "skyBlue", color: "white" }}
            transition="all 0.3s"
            fontWeight="bold"
            px={8}
            maxH="auto"
          >
            Rechercher
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
}
