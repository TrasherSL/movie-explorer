import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import { Container, Typography, CircularProgress, Grid, Box, Button } from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box sx={{ backgroundColor: "#f4f4f4", padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              {movie.title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Release Date: {movie.release_date}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, lineHeight: 1.6 }}>
              {movie.overview}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <Typography variant="body2">Rating: {movie.vote_average}</Typography>
              <Typography variant="body2">Genres: {movie.genres.map((genre) => genre.name).join(", ")}</Typography>
            </Box>
            <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
              Watch Trailer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieDetails;
