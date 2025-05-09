import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import {
  fetchMoviesWithFilters,
  fetchGenresFromAPI,
  fetchTrendingMovies,
} from "../api/tmdb";

const Home = () => {
  const { query, handleSearch } = useContext(MovieContext);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingLimit, setTrendingLimit] = useState(4); // show 4 by default
  const [allMoviesLimit, setAllMoviesLimit] = useState(12); // show 12 movies initially (3 rows)

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, index) => currentYear - index);
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchGenres = async () => {
      const genreData = await fetchGenresFromAPI();
      setGenres(genreData);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const filteredMovies = await fetchMoviesWithFilters(
        genre,
        year,
        rating,
        query
      );
      setMovies(filteredMovies);
      setLoading(false);
    };
    fetchMovies();
  }, [genre, year, rating, query]);

  const visibleTrending = trendingMovies.slice(0, trendingLimit);
  const visibleAllMovies = movies.slice(0, allMoviesLimit);

  return (
    <Container>
      {/* Filters & Search */}
      <Grid container spacing={2} sx={{ marginTop: 4 }} justifyContent="space-between">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Movies"
            variant="outlined"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            margin="normal"
          />
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select value={genre} onChange={(e) => setGenre(e.target.value)} label="Genre">
                  <MenuItem value="">All Genres</MenuItem>
                  {genres.map((g) => (
                    <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
                  <MenuItem value="">All Years</MenuItem>
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)} label="Rating">
                  <MenuItem value="">All Ratings</MenuItem>
                  {ratings.map((r) => (
                    <MenuItem key={r} value={r}>{r}+</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Trending Movies */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>Trending Movies</Typography>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {visibleTrending.length > 0 ? (
          visibleTrending.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}><CircularProgress /></Grid>
        )}
      </Grid>
      {trendingLimit < trendingMovies.length && (
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 3 }}
          onClick={() => setTrendingLimit((prev) => prev + 4)}
        >
          Load More
        </Button>
      )}

      {/* All Movies */}
      <Typography variant="h5" sx={{ marginTop: 4 }}>All Movies</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {visibleAllMovies.length > 0 ? (
              visibleAllMovies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <MovieCard movie={movie} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No movies found...</Typography>
            )}
          </Grid>
          {allMoviesLimit < movies.length && (
            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: 3 }}
              onClick={() => setAllMoviesLimit((prev) => prev + 12)} // Load 3 more rows
            >
              Load More
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
