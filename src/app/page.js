import { Container, Box, VStack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProfessionals from "./components/FeaturedProfessionals";
import Footer from "./components/Footer"; // ... import other components as needed

export default function Home() {
  return (
    <Box bg="lightGray" color="darkCharcoal" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" p={0}>
        <Hero />
        <FeaturedProfessionals/>
        
        {/* ... other components */}
      </Container>
      <Footer/>
    </Box>
  );
}
