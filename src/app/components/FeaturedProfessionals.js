"use client";

import { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Button,
  useToast,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { db } from "../../utils/firebase";
import { collection, query, getDocs, limit } from "firebase/firestore";

export default function FeaturedProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionalsCollection = collection(db, "users");
        const featuredProfessionalsQuery = query(
          professionalsCollection,
          limit(3)
        );
        const professionalsSnapshot = await getDocs(featuredProfessionalsQuery);
        const professionalsData = professionalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredData = professionalsData.filter(prof => prof.profilePic);
        setProfessionals(filteredData);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors du chargement des professionnels.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <Box p={8}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Professionnels en vedette
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {professionals.length > 0 ? (
          professionals.map((professional) => (
            <GridItem key={professional.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Image
                  src={professional.profilePic}
                  alt={professional.fullName}
                  h="200px"
                  w="full"
                  objectFit="cover"
                />
                <Box p={4}>
                  <VStack align="start">
                    <Heading as="h3" size="md" mb={1}>
                      {professional.fullName}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      {professional.businessType}
                    </Text>
                    <HStack spacing={1}>
                      {professional.serviceArea.map((area, index) => (
                        <Badge key={index} colorScheme="green">
                          {area.label}
                        </Badge>
                      ))}
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            </GridItem>
          ))
        ) : (
          <Text textAlign="center" color="gray.500">
            Aucun professionnel trouvé.
          </Text>
        )}
      </Grid>
      <Flex justifyContent="center" mt={6}>
        <Button colorScheme="teal" onClick={() => (window.location.href = "/search")}>
          Voir Plus
        </Button>
      </Flex>
    </Box>
  );
}
