import React, { useEffect, useState } from "react";
import products from "../../products";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import { colors } from "../common/comonData";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToCard, addTowish } from "../redux/slice";
import toast from "react-hot-toast";
import Slider from "react-slick";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { cardData, wishData } = useSelector((state) => state.products);
  const [product, setProduct] = useState();
  const [size, setSize] = React.useState();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [avalibility, setAvalibility] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const handelQuantity = (type) => {
    if (type === "add") {
      if (quantity < product?.stock) {
        setQuantity(quantity + 1);
        setAvalibility(avalibility - 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        setAvalibility(avalibility + 1);
      }
    }
  };

  useEffect(() => {
    const product = products.find((product) => product?.id === Number(id));
    setProduct(product);
    setAvalibility(product?.stock);
    setSelectedColor(product?.colors[0]);
    setSize(product?.size[0]);
  }, [id]);

  const showRating = (product) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < product?.rating) {
        stars.push(<StarIcon sx={{ color: "#01a479" }} />);
      } else {
        stars.push(
          <StarBorderPurple500OutlinedIcon sx={{ color: "#d3d3d3" }} />
        );
      }
    }
    return stars;
  };

  const handleSizeChange = async (event) => {
    setSize(event.target.value);
    console.log("event.target.value", event.target.value);
  };

  const handelAddToWish = (product) => {
    const isProductInWish = wishData?.some((item) => item?.id === product?.id);

    if (!isProductInWish) {
      dispatch(addTowish(product));
      toast.success("Product added to wish!", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const handleAddtoCard = (product) => {
    const isProductInCart = cardData?.some((item) => item?.id === product?.id);
    if (product.qty !== quantity || !isProductInCart) {
      dispatch(
        addToCard({
          ...product,
          qty: quantity,
          selectedSize: size,
          slectedColor: selectedColor,
        })
      );
      toast.success("Product added to cart!", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const handelSelectColor = (color) => {
    setSelectedColor(color);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          {product && (
            <Slider {...settings}>
              {product.pictures.map((picture, index) => (
                <img
                  key={index}
                  src={`../../src/assets/${picture}`}
                  alt={`Product ${index}`}
                  style={{
                    width: "100%",
                    height: "34rem",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
              ))}
            </Slider>
          )}
        </div>
        <div className="col-8 d-flex flex-column gap-4">
          <h2>{product?.name}</h2>
          <div>
            <div className="d-flex gap-2">
              <Typography variant="body2" sx={{ color: "#01a479" }}>
                <del>₹{product?.price}</del>
              </Typography>
              <Typography variant="body2" sx={{ color: "#01a479" }}>
                ₹{product?.salePrice}
              </Typography>
            </div>
            <div>{showRating(product)}</div>
          </div>

          <div className="">
            <span className="d-flex gap-2 mb-0">
              <p className="mb-1">Availibility:</p>{" "}
              <p style={{ color: "#9d9d9d" }} className="mb-1">
                {avalibility}
              </p>
            </span>

            <span className="d-flex gap-2 mb-0">
              <p className="mb-1">Categories:</p>{" "}
              <p style={{ color: "#9d9d9d" }} className="mb-1">
                {product?.category}
              </p>
            </span>
          </div>

          <div>
            <p className="mb-0" style={{ color: "#9d9d9d" }}>
              {product?.description}
            </p>
          </div>

          <div>
            <div className="row">
              <div className="col-4">
                <h6>Size</h6>
                <Box sx={{ minWidth: 50 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={size || ""}
                      label="Size"
                      onChange={handleSizeChange}
                    >
                      {product?.size.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="col-6">
                <h6>Color</h6>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                  }}
                >
                  {product?.colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => handelSelectColor(color)}
                      style={{
                        cursor: "pointer",
                        height: "36px",
                        width: "36px",
                        borderRadius: "5px",
                        background: colors[color],
                        border:
                          selectedColor === color
                            ? "3px solid blue"
                            : "1px solid transparent", // Highlight selected color
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <span className="d-flex gap-2 mb-0">
              <p className="mb-1 d-flex align-items-center">Quantity:</p>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ border: "1px solid black" }}
              >
                <CardActions sx={{ padding: "0px" }}>
                  <Button
                    sx={{ padding: "0px" }}
                    size="small"
                    color="primary"
                    onClick={() => handelQuantity("substract")}
                  >
                    <RemoveOutlinedIcon />
                  </Button>
                </CardActions>
                <span
                  style={{
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  {quantity}
                </span>
                <CardActions sx={{ padding: "0px" }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handelQuantity("add")}
                    sx={{ padding: "0px" }}
                  >
                    <AddIcon />
                  </Button>
                </CardActions>
              </div>
            </span>
          </div>

          <div className="">
            <CardActions sx={{ display: "flex", gap: "10px" }}>
              <Card
                className="card-icons"
                onClick={() => handleAddtoCard(product)}
                sx={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={
                    cardData?.some((item) => item?.id === product?.id)
                      ? { color: "blue" }
                      : {}
                  }
                />
                <span className="">Add To Cart</span>
              </Card>
              <Card
                sx={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                className="card-icons"
                onClick={() => handelAddToWish(product)}
              >
                {wishData?.some((item) => item?.id === product?.id) ? (
                  <>
                    {" "}
                    <FavoriteIcon sx={{ color: "red" }} />{" "}
                    <span>Add To Wishlist</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <FavoriteBorderOutlinedIcon /> <span>Add To Wishlist</span>
                  </>
                )}
              </Card>
            </CardActions>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
