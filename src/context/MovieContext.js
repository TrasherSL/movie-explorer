import React, { createContext, useState, useEffect } from "react";
import { fetchTrendingMovies, searchMovies, fetchMoviesWithFilters } from "../api/tmdb"; // Including fetchMoviesWithFilters

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

  // Fetch filtered movies based on genre, year, and rating
  const getFilteredMovies = async (genre, year, rating) => {
    setLoading(true);
    const filteredMovies = await fetchMoviesWithFilters(genre, year, rating);
    setMovies(filteredMovies);
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
    <MovieContext.Provider value={{ movies, query, loading, handleSearch, getFilteredMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
