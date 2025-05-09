import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieTrailer } from "../api/tmdb";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
  useTheme
} from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      const trailer = await fetchMovieTrailer(id); // Fetch trailer
      setMovie(details);
      setTrailerKey(trailer); // Save trailer key
      setLoading(false);
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ paddingTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
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
              <Typography variant="body2">
                Genres: {movie.genres.map((genre) => genre.name).join(", ")}
              </Typography>
            </Box>

            {/* Show trailer if available */}
            {trailerKey && (
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6">Watch Trailer:</Typography>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieDetails;
