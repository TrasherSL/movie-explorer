// src/components/MovieCard.js
import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "100%", height: "auto" }}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
