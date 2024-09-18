"use client";

import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
    >
      <Container as={Stack} maxW={"6xl"} py={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Heading as="h4" size="md" mb={{ base: 4, md: 0 }}>
            Almindhar PRO
          </Heading>
          <Stack direction={"row"} spacing={6}>
            <Link href={"#"}>À propos</Link>
            <Link href={"#"}>Contact</Link>
            <Link href={"#"}>Services</Link>
            <Link href={"#"}>Politique de confidentialité</Link>
          </Stack>
        </Flex>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 Almindhar PRO. Tous droits réservés.</Text>
          <Stack direction={"row"} spacing={6}>
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              size="lg"
              isRound
              _hover={{ bg: "mintGreen", color: "white" }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              size="lg"
              isRound
              _hover={{ bg: "mintGreen", color: "white" }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              size="lg"
              isRound
              _hover={{ bg: "mintGreen", color: "white" }}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              size="lg"
              isRound
              _hover={{ bg: "mintGreen", color: "white" }}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
