import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";

import NotFound from "./NotFound";
import { CreatePage } from "../pages/Create";
import { checkAuth } from "../features/Login";
import { Edit } from "../pages/Edit";
import { Show } from "../pages/Show";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status: loginData } = useSelector(
    (store: { login: { status: string } }) => store.login
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const ProtectedRoute = () => {
    console.log(loginData );
    if (loginData === 'success') {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/create" element={<CreatePage />} />
            <Route path="/movie/edit/:movieId" element={<Edit />} />
            <Route path="/movie/show/:movieId" element={<Show />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    }
    if (loginData === "logout") {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return (
    <div className="App">
      {ProtectedRoute()}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
