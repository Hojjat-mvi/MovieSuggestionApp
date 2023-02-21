import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    movies: builder.query({
      query: () => ({
        url: "/movies/",
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    movie: builder.query({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    addMovie: builder.mutation({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    deleteMovie: builder.mutation({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ movieId, ...movieUpdate }) => ({
        url: `/movies/${movieId}`,
        method: "PATCH",
        body: movieUpdate,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    }),
  }),
});

export const {
  useMovieQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useMoviesQuery,
  useUpdateMovieMutation,
} = moviesApi;
