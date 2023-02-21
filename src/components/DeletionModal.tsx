import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDeleteMovieMutation, useMoviesQuery } from "../services/movieApi";
import { toast } from "react-toastify";
import classes from "../Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";

interface IDelete {
  deleteId: number;
}

export const DeletionModal = ({ deleteId }: IDelete) => {
  const [movieDelete] = useDeleteMovieMutation();
  const movieList = useMoviesQuery(localStorage.getItem("token"));

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onSuccess = () => {
    setLoading(false);
    toast.warning("Movie DELETED!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      progress: undefined,
    });
    handleClose();
    movieList.refetch();
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

  if (loading) {
    return (
      <div className={classes.movieList}>
        <CircularProgress />
      </div>
    );
  }

  const deleteMovie = async () => {
    setLoading(true);

    try {
      await movieDelete(deleteId);
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="error"
        size="large"
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            delete contact
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            are you sure you want to delete this contact?
          </Typography>
          <br></br>
          <Button onClick={deleteMovie}>Delete</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};
