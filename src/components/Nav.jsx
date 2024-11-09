import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { resetState, signInSignup } from "../redux/slice";
import { deepOrange, deepPurple } from "@mui/material/colors";
const Nav = () => {
  const dispatch = useDispatch();
  const { cardData, wishData, user } = useSelector((state) => state.products);
  const [logedInUser, setLogedInUser] = useState();

  const navigate = useNavigate();

  const handelLogOut = () => {
    localStorage.setItem("logInUser", "");
    navigate("/signIn");
    dispatch(signInSignup(false));
    // dispatch(resetState());
  };
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("logInUser") || "null");
  //   console.log("🚀 ~ useEffect ~ user:", user);
  // }, [dispatch]);

  return (
    <div className="d-flex justify-content-end gap-4 mb-4">
      <Stack
        spacing={2}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Badge
          sx={{ cursor: "pointer" }}
          badgeContent={0}
          color="secondary"
          onClick={() => navigate("/")}
        >
          <HomeOutlinedIcon />
        </Badge>
        <Badge
          sx={{ cursor: "pointer" }}
          badgeContent={cardData.length}
          color="secondary"
          onClick={() => navigate("/card")}
        >
          <ShoppingCartOutlinedIcon />
        </Badge>
        <Badge
          sx={{ cursor: "pointer" }}
          badgeContent={wishData.length}
          color="success"
          onClick={() => navigate("/wish")}
        >
          <FavoriteBorderOutlinedIcon />
        </Badge>
        <Badge>
          <Button variant="contained" onClick={() => handelLogOut()}>
            {user?.isAuthenticated ? "Log Out" : "Log In"}
          </Button>
        </Badge>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        </Stack>
      </Stack>
    </div>
  );
};

export default Nav;
