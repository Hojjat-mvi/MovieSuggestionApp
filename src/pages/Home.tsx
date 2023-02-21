import { Movie } from "../components/movie";
import classes from "../Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import NavBar from "../components/NavBar";
import { Search } from "../components/Search";

import { useMoviesQuery } from "../services/movieApi";
import { useEffect } from "react";
import { useState } from "react";

export const Home = () => {
  const movieList = useMoviesQuery(localStorage.getItem("token"));
  const { data } = useMoviesQuery(localStorage.getItem("token"));

  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const search = (value: string) => {
    setIsLoading(true);
    if (!value || value === "") {
      setIsSearch(false);
      setSearchValue("");
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      setIsSearch(true);
      setSearchValue(value);

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    movieList.refetch();
  }, []);

  const showContent = () => {
    if (isSearch) {
      return data.map(
        (movie: {
          name: string;
          description: string;
          id: number;
          creator: string;
        }) => {
          if (searchValue === movie.name) {
            return <Movie movie={movie} key={movie.id} />;
          }
        }
      );
    } else {
      return data.map(
        (movie: {
          name: string;
          description: string;
          id: number;
          creator: string;
        }) => {
          return <Movie movie={movie} key={movie.id} />;
        }
      );
    }
  };

  if (!data || isLoading) {
    return (
      <div className={classes.movieList}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className={classes.movieList}>
        <div style={{ margin: "5px" }}>
          <Search search={search} val={searchValue} />
        </div>
        {showContent()}
      </div>
    </div>
  );
};
