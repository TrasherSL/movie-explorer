import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Grid, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCard";

const API_KEY = "6fc7f241cd8253450e73b1c58d91aa9b";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Trending Movies
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {movies.slice(0, visibleCount).map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {visibleCount < movies.length && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              style={{ marginTop: "1rem" }}
            >
              Load More
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingMovies;
