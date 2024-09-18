"use client";

import { useState } from "react";
import {
  Input,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearchLocation, FaUserTie, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

// Profession options for autocomplete
const professions = [
  "Architecte", "Designer d'intérieur", "Entrepreneur général", "Électricien", "Plombier",
  "Charpentier", "Maçon", "Peintre", "Couvreur", "Spécialiste du revêtement de sol",
  "Poseur de carrelage", "Technicien en CVC", "Paysagiste", "Jardinier", "Géomètre",
  "Ingénieur en structure", "Agent immobilier", "Gestionnaire de propriété", "Courtier hypothécaire",
  "Home stager", "Inspecteur en bâtiment", "Ouvrier en béton", "Poseur de cloisons sèches",
  "Installateur de fenêtres", "Vitrier", "Installateur de bardage", "Ébéniste", "Designer de meubles",
  "Constructeur de terrasses", "Installateur de clôtures", "Homme à tout faire", "Installateur de panneaux solaires",
  "Constructeur de piscines", "Briqueteur", "Installateur de systèmes septiques", "Spécialiste en pavage",
  "Installateur de systèmes de sécurité", "Installateur de gouttières", "Ramoneur", "Spécialiste en étanchéité",
  "Technicien en domotique", "Designer de cuisine", "Rénovateur de salle de bain", "Spécialiste en revêtement extérieur",
  "Designer d'éclairage", "Spécialiste de l'insonorisation", "Installateur de bardages", "Ouvrier en démolition",
  "Poseur de tuiles de toit", "Spécialiste des traitements de fenêtres"
];

// Region options for location search
const regions = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes",
  "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili",
  "Mahdia", "Manouba", "Mednine", "Monastir", "Nabeul",
  "Sfax", "Sousse", "Tunis", "Zaghouan", "Sidi Bouzid",
  "Siliana", "Tozeur", "Djerba"
];

const SearchBar = ({ initialProfession = [], initialLocation = "" }) => {
  const router = useRouter();
  const [selectedProfessions, setSelectedProfessions] = useState(initialProfession);
  const [inputProfession, setInputProfession] = useState("");
  const [suggestedProfessions, setSuggestedProfessions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Debounce input handling
  const handleProfessionInputChange = debounce((value) => {
    if (value.length > 1) {
      const suggestions = professions.filter((profession) =>
        profession.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedProfessions(suggestions);
    } else {
      setSuggestedProfessions([]);
    }
  }, 300);

  const handleProfessionChange = (e) => {
    const { value } = e.target;
    setInputProfession(value);
    handleProfessionInputChange(value);
  };

  // Handle profession selection
  const handleProfessionSelect = (profession) => {
    if (!selectedProfessions.includes(profession)) {
      setSelectedProfessions([...selectedProfessions, profession]);
    }
    setInputProfession(""); // Clear input after selecting
    setSuggestedProfessions([]); // Clear suggestions
  };

  // Remove selected profession
  const removeProfession = (profession) => {
    setSelectedProfessions(selectedProfessions.filter((p) => p !== profession));
  };

  // Handle location selection
  const handleLocationChange = (region) => {
    setSelectedLocation(region);
    onClose(); // Close popover after selection
  };

  // Handle search
  const handleSearch = () => {
    const query = new URLSearchParams({
      profession: selectedProfessions.join(","),
      location: selectedLocation,
    }).toString();

    router.push(`/search-results?${query}`);
  };

  const isSearchDisabled = selectedProfessions.length === 0 && !selectedLocation;

  return (
    <Box w="full" maxW="800px" mb={10}>
      <HStack
        spacing={4}
        w="full"
        bg="white"
        borderRadius="md"
        boxShadow="md"
        padding={4}
        align="center"
        position="relative"
      >
        {/* Profession Input with Autocomplete */}
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none" color="gray.400">
            <FaUserTie />
          </InputLeftElement>
          <Input
            placeholder="Quelle profession ?"
            size="lg"
            value={inputProfession}
            onChange={handleProfessionChange}
            borderRadius="md"
            _placeholder={{ color: "gray.500" }}
            zIndex={1} // Ensure input stays above autocomplete suggestions
          />
          {/* Autocomplete Suggestions */}
          {suggestedProfessions.length > 0 && (
            <Box
              bg="white"
              shadow="md"
              borderRadius="md"
              mt={1}
              position="absolute"
              zIndex={1000}
              maxW="100%"
              width="full"
            >
              <List spacing={1}>
                {suggestedProfessions.map((profession) => (
                  <ListItem
                    key={profession}
                    onClick={() => handleProfessionSelect(profession)}
                    cursor="pointer"
                    px={3}
                    py={2}
                    _hover={{ bg: "gray.100" }}
                  >
                    {profession}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </InputGroup>

        {/* Selected Professions */}
        <Stack spacing={2} direction="row" wrap="wrap">
          {selectedProfessions.map((profession) => (
            <Tag key={profession} colorScheme="teal" borderRadius="md">
              <TagLabel>{profession}</TagLabel>
              <TagCloseButton onClick={() => removeProfession(profession)} />
            </Tag>
          ))}
        </Stack>

        {/* Location Selection Popover */}
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
              {selectedLocation || "Où ?"}
            </Button>
          </PopoverTrigger>
          <PopoverContent width="300px">
            <PopoverArrow />
            <PopoverBody maxHeight="300px" overflowY="auto">
              <Stack spacing={2}>
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedLocation === region ? "solid" : "outline"}
                    colorScheme="teal"
                    onClick={() => handleLocationChange(region)}
                    width="full"
                  >
                    {region}
                  </Button>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          size="lg"
          variant="solid"
          colorScheme={isSearchDisabled ? "gray" : "teal"}
          borderRadius="full"
          _hover={{
            bg: isSearchDisabled ? "none" : "teal.500",
            color: isSearchDisabled ? "none" : "white",
            transform: isSearchDisabled ? "none" : "scale(1.05)",
          }}
          transition="all 0.3s"
          onClick={handleSearch}
          isDisabled={isSearchDisabled}
          height="50px"
          width="50px"
        >
          <FaArrowRight />
        </Button>
      </HStack>
    </Box>
  );
};

export default SearchBar;
