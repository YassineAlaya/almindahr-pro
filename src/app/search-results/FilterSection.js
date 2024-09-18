"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Heading,
  Checkbox,
  Stack,
  Divider,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { FaUserTie, FaSearchLocation } from "react-icons/fa";
import { debounce } from "lodash"; // Import lodash utilities
import { useDisclosure } from "@chakra-ui/hooks";

const regions = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes",
  "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili",
  "Mahdia", "Manouba", "Mednine", "Monastir", "Nabeul",
  "Sfax", "Sousse", "Tunis", "Zaghouan", "Sidi Bouzid",
  "Siliana", "Tozeur", "Djerba"
];

const FilterSection = ({ onFilterChange }) => {
  const [filters, setFilters] = useState([
    { id: "plumbing", label: "Plomberie", checked: false },
    { id: "electricity", label: "Électricité", checked: false },
    { id: "architecture", label: "Architecture", checked: false },
    { id: "renovation", label: "Rénovation", checked: false },
    { id: "landscaping", label: "Aménagement", checked: false },
    { id: "cleaning", label: "Nettoyage", checked: false },
  ]);

  const [isPremium, setIsPremium] = useState(false); // Track premium plan filter
  const [experience, setExperience] = useState(0); // Track years of experience filter
  const [profession, setProfession] = useState(""); // Track profession filter
  const [selectedLocations, setSelectedLocations] = useState([]); // Track selected locations
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Debounced filter update to prevent excessive renders
  const debouncedFilterChange = useCallback(
    debounce((updatedFilters) => {
      onFilterChange(updatedFilters);
    }, 300),
    []
  );

  // Handle changes to any filter (services, premium, experience)
  const handleFilterChange = (filterId) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === filterId ? { ...filter, checked: !filter.checked } : filter
    );
    setFilters(updatedFilters);
    debouncedFilterChange({ filters: updatedFilters, isPremium, experience, profession, selectedLocations });
  };

  // Handle profession input change
  const handleProfessionChange = (e) => {
    const value = e.target.value;
    setProfession(value);
    debouncedFilterChange({ filters, isPremium, experience, profession: value, selectedLocations });
  };

  // Handle premium toggle
  const handlePremiumChange = () => {
    const updatedPremium = !isPremium;
    setIsPremium(updatedPremium);
    debouncedFilterChange({ filters, isPremium: updatedPremium, experience, profession, selectedLocations });
  };

  // Handle experience slider change
  const handleExperienceChange = (value) => {
    setExperience(value);
    debouncedFilterChange({ filters, isPremium, experience: value, profession, selectedLocations });
  };

  // Handle location selection/deselection
  const handleLocationChange = (region) => {
    const updatedLocations = selectedLocations.includes(region)
      ? selectedLocations.filter((loc) => loc !== region)
      : [...selectedLocations, region];
    setSelectedLocations(updatedLocations);
    debouncedFilterChange({ filters, isPremium, experience, profession, selectedLocations: updatedLocations });
  };

  // Reset filters if needed
  const resetFilters = () => {
    const resetFilters = filters.map((filter) => ({ ...filter, checked: false }));
    setFilters(resetFilters);
    setIsPremium(false);
    setExperience(0);
    setProfession("");
    setSelectedLocations([]);
    debouncedFilterChange({
      filters: resetFilters,
      isPremium: false,
      experience: 0,
      profession: "",
      selectedLocations: [],
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} bg="white">
      <Heading as="h3" size="lg" mb={4}>
        Filtres Avancés
      </Heading>
      <Divider mb={4} />

      {/* Profession Input */}
      <InputGroup flex="1" mb={4}>
        <InputLeftElement pointerEvents="none" color="gray.400">
          <FaUserTie />
        </InputLeftElement>
        <Input
          placeholder="Profession"
          size="lg"
          value={profession}
          onChange={handleProfessionChange}
          borderRadius="md"
          _placeholder={{ color: "gray.500" }}
        />
      </InputGroup>

      <Divider mb={4} />

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
            mb={4}
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
            <HStack spacing={2} mt={4} wrap="wrap">
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

      <Divider mb={4} />

      {/* Services Filter */}
      <Stack spacing={3} mb={4}>
        {filters.map((filter) => (
          <Checkbox
            key={filter.id}
            isChecked={filter.checked}
            onChange={() => handleFilterChange(filter.id)}
            colorScheme="teal"
          >
            {filter.label}
          </Checkbox>
        ))}
      </Stack>

      <Divider mb={4} />

      {/* Premium Plan Filter */}
      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel htmlFor="premium-switch" mb="0">
          Vérifié
        </FormLabel>
        <Switch
          id="premium-switch"
          isChecked={isPremium}
          onChange={handlePremiumChange}
          colorScheme="teal"
        />
      </FormControl>

      <Divider mb={4} />

      {/* Experience Filter */}
      <Box>
        <Text mb={4}>Années d'expérience : {experience} ans</Text>
        <Slider
          defaultValue={0}
          min={0}
          max={30}
          step={1}
          value={experience}
          onChange={handleExperienceChange}
          colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Text fontSize="sm">{experience}</Text>
          </SliderThumb>
        </Slider>
      </Box>

      <Divider mb={4} />

      {/* Reset Filters Button */}
      <Flex justifyContent="flex-end" mt={4}>
        <Text
          as="button"
          onClick={resetFilters}
          color="teal.500"
          _hover={{ textDecoration: "underline" }}
        >
          Réinitialiser les filtres
        </Text>
      </Flex>
    </Box>
  );
};

export default FilterSection;
