import * as React from "react";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/Register";
import { AppDispatch } from "../store";
import { Id,toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()

  const { data: registerData, status: registerStatus } = useSelector(
    (store: { register: { status: string; data: string } }) => store.register
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const toastState = React.useRef<Id | null>(null)

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password !== passwordRetype) {
      toast.error("passwords does not match !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: "380px", right: "100px" },
      });
    } else if (!password || !passwordRetype) {
      toast.error("fill the passwords fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
      toastState.current = toast.loading("REGISTERING, WAIT...", {
        position: "top-right",
      });
      dispatch(register({ password, email }));
    }
  };


  useEffect(() => {
    if (registerStatus === "success") {
      toast.update(toastState.current || "", {
        render: "REGISTERED SUCCESSFULLY!",
        type: "success",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
        delay: 500,
      });
      navigate('/')
    }
    if (registerStatus === "Error") {
      toast.update(toastState.current || "", {
        render: registerData,
        type: "error",
        delay: 1000,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        isLoading: false,
      });
    }
  }, [registerData, registerStatus]);

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
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordRetype"
                  label="Password Retype"
                  type="password"
                  id="passwordRetype"
                  autoComplete="new-password"
                  value={passwordRetype}
                  onChange={(event) => {
                    setPasswordRetype(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
