import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../features/Login";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "../Home.module.css";

const theme = createTheme();

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const {
    status: loginStatus,

    data: loginData,
  } = useSelector(
    (store: { login: { status: string; data: string } }) => store.login
  );

  const loginForm = (e: any) => {
    e.preventDefault();
    if (!password) {
      toast.error("PLS Enter Password !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: "380px", right: "100px" },
      });
    } else if (!isValidEmail(email)) {
      toast.error("email is invalid", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setIsLoading(true);
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("LOGIN SUCCESSFULLY!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        progress: undefined,
      });
      setIsLoading(false);
      navigate("/movies");
    }
    if (loginStatus === "Error") {
      setIsLoading(false);
      toast.error(loginData, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [loginData, loginStatus]);

  if (isLoading) {
    return (
      <div className={classes.movieList}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginForm}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
