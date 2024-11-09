import "./App.css";

import "../src/css/app.css";
import "../src/css/signup.css";
import Nav from "./components/Nav";
import MainLayout from "./components/MainLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CardAddedData from "./components/CardAddedData";
import WishAddedData from "./components/WishAddedData";
import SingleProduct from "./components/singleProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignUp from "./signUp/SignUp";
import LogIn from "./logIn/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signInSignup } from "./redux/slice";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const logInUser = JSON.parse(localStorage.getItem("logInUser") || "null");
    if (logInUser) {
      dispatch(signInSignup(true));
      if (user?.isAuthenticated) {
        navigate("/");
      }
    }
  }, []);
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card"
          element={
            <ProtectedRoute>
              <CardAddedData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wish"
          element={
            <ProtectedRoute>
              <WishAddedData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
