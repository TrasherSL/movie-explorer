import React, { useContext } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import TrendingMovies from "../components/TrendingMovies";

const Home = () => {
  const { movies, query, loading, handleSearch } = useContext(MovieContext);

  return (
    <Container>
      {/* Search Bar First */}
      <TextField
        fullWidth
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        margin="normal"
        sx={{ marginTop: 4 }}
      />
      {/* Trending Section */}
      <TrendingMovies />

      {/* Search Results */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No movies found...</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
