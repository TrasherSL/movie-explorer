    import React, { createContext, useState, useEffect } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";

// Create a context
export const MovieContext = createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch trending movies
  const getTrendingMovies = async () => {
    setLoading(true);
    const trendingMovies = await fetchTrendingMovies();
    setMovies(trendingMovies);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (query) => {
    setQuery(query);
    setLoading(true);
    if (query.trim() !== "") {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } else {
      getTrendingMovies();
    }
    setLoading(false);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, query, loading, handleSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
