"use client";

import { Box, SimpleGrid, Heading, Text, Image, Card, CardBody, CardFooter, Button, Stack } from "@chakra-ui/react";

const SearchResultsList = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Heading as="h3" size="lg" mb={4}>
          Aucune recherche trouvée
        </Heading>
        <Text color="gray.500">
          Veuillez essayer avec d'autres mots-clés ou localisations.
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
      {results.map((result) => (
        <Card key={result.id} borderWidth="1px" borderRadius="md" overflow="hidden">
          {/* Handle missing profilePic with a fallback */}
          <Image
            src={result.profilePic || '/default_profile_pic.jpg'}
            alt={result.businessName || 'Unknown business'}
            fallbackSrc="/default_profile_pic.jpg"
            objectFit="cover"
            height="200px"
          />
          <CardBody>
            <Heading as="h4" size="md" mb={2}>
              {result.businessName || 'Nom de l’entreprise inconnu'}
            </Heading>
            <Stack spacing={2}>
              <Text color="gray.600">{result.businessType || 'Type inconnu'}</Text>
              <Text color="gray.500">
                {result.serviceArea?.map(area => area.label).join(', ') || 'Aucune zone de service'}
              </Text>
              <Text color="gray.500">
                {result.experience
                  ? `${result.experience} années d'expérience`
                  : 'Aucune expérience indiquée'}
              </Text>
              <Text color="gray.500">Téléphone: {result.phoneNumber || 'Non disponible'}</Text>
              <Text color="gray.500">Plan: {result.plan || 'Non spécifié'}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => console.log(`Voir le profil de ${result.businessName}`)}
            >
              Voir le profil
            </Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default SearchResultsList;
