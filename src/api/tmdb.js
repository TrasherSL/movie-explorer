import axios from "axios";

const API_KEY = "70d071e172963793629c325aaf711b07";
const BASE_URL = "https://api.themoviedb.org/3"; 

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Search movies by title
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching for movies:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch full movie details
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.response ? error.response.data : error.message);
    return {};
  }
};

// Fetch movies with filters (genre, year, rating)
export const fetchMoviesWithFilters = async (genre, year, rating) => {
  try {
    const params = {
      api_key: API_KEY,
      with_genres: genre,
      year,
      "vote_average.gte": rating || undefined, // Only add if rating exists
    };

    // Fetch movies with applied filters
    const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching filtered movies:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch genres for filter dropdown
export const fetchGenresFromAPI = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Fetch movie trailer from TMDb
export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });

    // Look for the first YouTube trailer
    const youtubeTrailer = response.data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    return youtubeTrailer ? youtubeTrailer.key : null; // Return the video key if found, else null
  } catch (error) {
    console.error("Error fetching movie trailer:", error.response ? error.response.data : error.message);
    return null; // Return null if no trailer is found or an error occurs
  }
};
