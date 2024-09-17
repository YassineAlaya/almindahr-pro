"use client"; // Add this line at the top of the file

import { useRouter } from 'next/navigation';

const SearchResults = () => {
  const router = useRouter();

  // You can access query parameters here
  // e.g., const { profession, locations } = router.query;

  return (
    <div>
      {/* Render your search results based on the profession and locations */}
      <h1>Search Results</h1>
    </div>
  );
};

export default SearchResults;
