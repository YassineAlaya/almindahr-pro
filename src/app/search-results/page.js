"use client";

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Flex,
  Divider,
  Spinner,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchResultsList from "./SearchResultsList";
import FilterSection from "./FilterSection";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  // State to track filters from the FilterSection
  const [filters, setFilters] = useState({
    profession: searchParams.get("profession") || "",
    locations: searchParams.get("locations") ? searchParams.get("locations").split(",") : [],
    isPremium: false,
    experience: 0,
  });

  // Function to fetch results based on filters
  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const professionalsRef = collection(db, "users");
      let q = query(professionalsRef);

      // Apply filters based on profession and locations
      if (filters.profession) {
        console.log(`Filtering by profession: ${filters.profession}`);
        q = query(q, where("businessType", "==", filters.profession.toLowerCase()));
      }

      if (filters.locations.length > 0 && filters.locations[0] !== "") {
        console.log(`Filtering by locations: ${filters.locations}`);
        q = query(q, where("serviceArea", "array-contains-any", filters.locations));
      }

      // Fetch data from Firebase Firestore
      const querySnapshot = await getDocs(q);
      const fetchedResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched results:", fetchedResults);
      setResults(fetchedResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  // Trigger fetchResults when filters change
  useEffect(() => {
    // Fetch results only if profession or locations are provided
    fetchResults();
  }, [filters]); // Depend on filters

  // Handle filter change from FilterSection
  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box bg="gray.50" flex="1" py={10}>
        <VStack spacing={8} w="full" maxW="1200px" mx="auto" px={4}>
          {/* Grid layout with Filter on the left and Results on the right */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 3fr" }} gap={8} w="full">
            {/* Filters Section */}
            <GridItem>
              <FilterSection onFilterChange={handleFilterChange} />
            </GridItem>

            {/* Search Results Section */}
            <GridItem>
              <Flex justify="space-between" alignItems="center" mb={4}>
                {/* Optional: Add SortOptions component here */}
              </Flex>

              <Divider borderColor="gray.300" />

              {/* Display Loading Spinner */}
              {loading ? (
                <Flex justify="center" align="center" py={10}>
                  <Spinner size="xl" />
                </Flex>
              ) : error ? (
                <Text color="red.500" fontSize="lg">
                  {error}
                </Text>
              ) : results.length > 0 ? (
                <>
                  <SearchResultsList results={currentResults} />
                  <Pagination
                    currentPage={currentPage}
                    totalResults={results.length}
                    resultsPerPage={resultsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <NoResults />
              )}
            </GridItem>
          </Grid>
        </VStack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default SearchResults;
