import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { toast } from "react-toastify";
import classes from "../Home.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useAddMovieMutation } from "../services/movieApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IValues {
  genre?: string;
  description: string;
  name: string;
  date?: string;
}

export const CreatePage = () => {
  const navigate = useNavigate();
  const [createMovie] = useAddMovieMutation();

  const [loading, setLoading] = useState(false);
  const [days, setDays] = React.useState<Dayjs | any>(dayjs("2014-08-18"));
  const [values, setValues] = useState<IValues>({
    genre: "",
    description: "",
    name: "",
  });

  let email = localStorage.getItem("email");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, genre: (event.target as HTMLInputElement).value });
  };

  const onSuccess = (): void => {
    setLoading(false);
    toast.success("Your Movie Added!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      progress: undefined,
    });
    navigate("/movies");
  };

  const onError = (e: any) => {
    setLoading(false);
    if (e.message === "Network Error") {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(e.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { name, description, genre, date } = values;

  const onSubmit = async () => {
    setLoading(true);
    const movie = {
      name,
      description,
      genre,
      date,
      creator: email,
    };
    try {
      await createMovie(movie);
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  if (loading) {
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
        <Box
          sx={{
            width: 1000,
            maxWidth: "100%",
          }}
        >
          <h1>Create your movie</h1>
          <TextField
            id="standard-basic"
            label="Movie Name"
            variant="standard"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />
          <FormLabel id="demo-row-radio-buttons-group-label">Genre</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={genre}
            onChange={handleGenreChange}
          >
            <FormControlLabel
              value="Action"
              control={<Radio />}
              label="Action"
            />
            <FormControlLabel value="Drama" control={<Radio />} label="Drama" />
            <FormControlLabel
              value="documentary"
              control={<Radio />}
              label="Documentary"
            />
            <FormControlLabel
              value="SciFi"
              control={<Radio />}
              label="Sci-Fi"
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
            onChange={handleChange}
          />
          <br />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={(newValue: Dayjs | any) => {
                setDays(newValue);
                values.date = days;
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              onSubmit();
            }}
          >
            Create
          </Button>
        </Box>
      </div>
    </div>
  );
};
