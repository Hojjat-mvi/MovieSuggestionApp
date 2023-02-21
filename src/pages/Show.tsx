import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { useLocation, useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import classes from "../Home.module.css";
import { useState } from "react";

interface IValues {
  genre?: string;
  description: string;
  name: string;
  date?: string;
}

export const Show = () => {

  const state = useLocation();
  const movieParams = state.state.movie;
  const movieId = movieParams.id;

  const [days, setDays] = React.useState<Dayjs | any>(dayjs("2014-08-18"));
  const [values, setValues] = useState<IValues>({
    description: "" || movieParams.description,
    name: "" || movieParams.name,
    genre: "" || movieParams.genre,
    date: movieParams.date,
  });

  const { name, description, genre, date } = values;

  return (
    <div>
      <NavBar />
      <div className={classes.movieList}>
        <Box
          sx={{
            width: 1000,
            maxWidth: "100%",
          }}
        >
          <h1>Movie Details</h1>
          <TextField
            id="standard-basic"
            label="Movie Name"
            variant="standard"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <br />
          <FormLabel id="demo-row-radio-buttons-group-label">Genre</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={genre}
          >
            <FormControlLabel
              value="Action"
              control={<Radio />}
              label="Action"
              disabled
            />
            <FormControlLabel
              disabled
              value="Drama"
              control={<Radio />}
              label="Drama"
            />
            <FormControlLabel
              value="documentary"
              control={<Radio />}
              label="Documentary"
              disabled
            />
            <FormControlLabel
              value="SciFi"
              control={<Radio />}
              label="Sci-Fi"
              disabled
            />
          </RadioGroup>
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            name="description"
            value={description}
            InputProps={{
              readOnly: true,
            }}
          />
          <br />
          <br />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="date"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            name="date"
            value={date}
            InputProps={{
              readOnly: true,
            }}
          />

          <br />
          <br />
          <br />
        </Box>
      </div>
    </div>
  );
};
