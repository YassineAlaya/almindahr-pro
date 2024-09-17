// src/app/components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Link,
  Image,
  HStack,
} from "@chakra-ui/react";
import { auth } from "../../utils/firebase"; // Ensure the correct path to firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginModal from "./LoginModal"; // Import the login modal component

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for controlling modal

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state when logged in
      } else {
        setUser(null); // Clear the user state when logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box bg="lightGray" p={4} borderBottom="1px solid lightBlueGray">
      <Flex alignItems="center">
        <Image
          src="/images/almindhar (2).png"
          alt="Almindhar PRO"
          boxSize="40px"
          mr={4}
        />
        <Heading
          as="h1"
          size="lg"
          color="coolBlue"
          letterSpacing="wide"
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          Almindhar PRO
        </Heading>
        <Spacer />
        <HStack spacing={{ base: 4, md: 8 }}>
          <Link href="/">Accueil</Link>
          <Link href="/services">Services</Link>
          <Link href="/professionnels">Professionnels</Link>
          <Link href="/contact">Contact</Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  bg="mintGreen"
                  color="white"
                  _hover={{
                    bg: "skyBlue",
                    color: "white",
                  }}
                  px={6}
                  py={2}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="8px"
                  transition="all 0.3s ease"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                bg="mintGreen"
                color="white"
                _hover={{
                  bg: "skyBlue",
                  color: "white",
                }}
                px={6}
                py={2}
                fontSize="md"
                fontWeight="600"
                borderRadius="8px"
                transition="all 0.3s ease"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button
                bg="mintGreen"
                color="white"
                _hover={{
                  bg: "skyBlue",
                  color: "white",
                }}
                px={6}
                py={2}
                fontSize="md"
                fontWeight="600"
                borderRadius="8px"
                transition="all 0.3s ease"
                onClick={handleLoginOpen}
              >
                Connexion
              </Button>
              {/* Render Login Modal */}
              <LoginModal isOpen={isLoginOpen} onClose={handleLoginClose} />
              <Link href="/register">
                <Button
                  bg="mintGreen"
                  color="white"
                  _hover={{
                    bg: "skyBlue",
                    color: "white",
                  }}
                  px={6}
                  py={2}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="8px"
                  transition="all 0.3s ease"
                >
                  Inscription
                </Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
