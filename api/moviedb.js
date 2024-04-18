import axios from "axios";
import { apiKey } from "../constants/index";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoints = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoints = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const movieSimilarMoviesEndpoints = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndpoints = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const personDetailsEndpoints = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personCreditsEndpoints = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log("error", err);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoints(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoints(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(movieSimilarMoviesEndpoints(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoints(id));
};
export const fetchPersonCredits = (id) => {
  return apiCall(personCreditsEndpoints(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoints, params);
};
