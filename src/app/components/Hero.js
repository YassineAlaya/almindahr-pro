"use client";

import { useState } from "react";
import {
  Heading,
  Text,
  Input,
  Button,
  Box,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearchLocation, FaUserTie, FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation'; // Change this import

const regions = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes",
  "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili",
  "Mahdia", "Manouba", "Mednine", "Monastir", "Nabeul",
  "Sfax", "Sousse", "Tunis", "Zaghouan", "Sidi Bouzid",
  "Siliana", "Tozeur", "Djerba", "Gafsa"
];

export default function Hero() {
  const router = useRouter(); // Call useRouter here
  const [profession, setProfession] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLocationChange = (region) => {
    setSelectedLocations((prev) =>
      prev.includes(region) ? prev.filter((loc) => loc !== region) : [...prev, region]
    );
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      profession,
      locations: selectedLocations.join(","),
    }).toString(); // Format the query parameters as a string
  
    router.push(`/search-results?${query}`); // Navigate to the search results page with query params
  };
  
  

  const isSearchDisabled = !profession && selectedLocations.length === 0;

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
        <HStack
          spacing={4}
          w="full"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          padding={4}
        >
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none" color="gray.400">
              <FaUserTie />
            </InputLeftElement>
            <Input
              placeholder="Profession"
              size="lg"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              borderRadius="md"
              _placeholder={{ color: "gray.500" }}
            />
          </InputGroup>

          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button
                size="lg"
                bg="white"
                borderRadius="md"
                onClick={onOpen}
                _hover={{ bg: "lightGray" }}
                leftIcon={<FaSearchLocation />}
              >
                Localisation
              </Button>
            </PopoverTrigger>
            <PopoverContent width="300px">
              <PopoverArrow />
              <PopoverBody maxHeight="300px" overflowY="auto">
                <Stack spacing={2}>
                  {regions.map((region) => (
                    <Button
                      key={region}
                      variant={selectedLocations.includes(region) ? "solid" : "outline"}
                      colorScheme="teal"
                      onClick={() => handleLocationChange(region)}
                      width="full"
                    >
                      {region}
                    </Button>
                  ))}
                </Stack>
                <HStack spacing={2} mt={4}>
                  {selectedLocations.map((location) => (
                    <Tag key={location} colorScheme="teal" borderRadius="md">
                      <TagLabel>{location}</TagLabel>
                      <TagCloseButton onClick={() => handleLocationChange(location)} />
                    </Tag>
                  ))}
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button
          size="lg"
          variant="outline" // Change to outline style for a modern look
          color={isSearchDisabled ? "gray.500" : "green"}
          borderWidth="2px"
          borderColor="mintGreen" // Set default border color
          borderRadius="full"
          _hover={{ bg: "mintGreen", color: "mintGreen", transform: "scale(1.05)" }} // Hover effect with scaling
          transition="all 0.3s" // Smooth transition
          onClick={handleSearch}
          minWidth="50px" // Minimum width for the button
          height="50px" // Height for a round button
        >
          <FaArrowRight /> 
        </Button>
        </HStack>
      </Box>
    </Flex>
  );
}
