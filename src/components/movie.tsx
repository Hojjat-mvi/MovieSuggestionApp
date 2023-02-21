import { FC } from "react";
import classes from "../Home.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { DeletionModal } from "./DeletionModal";

type movieTypes = {
  name: string;
  description: string;
  creator: string;
  id: number;
  genre?: string;
};

interface movieProps {
  movie: movieTypes;
}

export const Movie: FC<movieProps> = ({ movie }) => {
  const navigate = useNavigate();

  let email = localStorage.getItem("email");

  return (
    <div className={classes.movieComponent}>
      <div className={classes.titles}>
        <h2>name : {movie.name} </h2>
        <br />
        <h2>genre : {movie.genre}</h2>
        <br />
        <h2>creator : {movie.creator}</h2>
      </div>
      <div className={classes.space}></div>
      {movie.creator === email ? (
        <div className={classes.buttonEnd}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              navigate(`/movie/show/${movie.id}`, { state: { movie } });
            }}
          >
            Show
          </Button>{" "}
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              navigate(`/movie/edit/${movie.id}`, { state: { movie } });
            }}
          >
            Edit
          </Button>{" "}
          <DeletionModal deleteId={movie.id} />
        </div>
      ) : (
        <div className={classes.buttonEnd}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              navigate(`/movie/show/${movie.id}`, { state: { movie } });
            }}
          >
            Show
          </Button>
        </div>
      )}
    </div>
  );
};
