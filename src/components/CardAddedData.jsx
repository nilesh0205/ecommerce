import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  addTowish,
  dicQty,
  incQty,
  removeToCard,
  removeTowish,
} from "../redux/slice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import toast from "react-hot-toast";
import { colors } from "../common/comonData";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Slider from "react-slick";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import Checkout from "./payment/Checkout";

// const stripePromise = loadStripe(
//   "pk_test_51P8b67SGE0pQzSKCIeYeH2LL6EyfRY0tgWtgL4cBNUt73piG1GaQIqIXjRRct7gQiUbb0SfXkEmEzgqxf3wK2xXz007wBk3gOL"
// );

const CardAddedData = () => {
  const { cardData, wishData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [totalPayAmount, setTotalPayAmount] = useState(0);
  const [cardDatas, setCardDatas] = useState(cardData);
  const [totalAmount, setTotalAmount] = useState(0);

  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handelRemoveFromCard = (product) => {
    if (product) {
      dispatch(removeToCard(product));
      toast.success("Product Remove Successfully From Card.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const totalPay = cardData.reduce((acc, product) => {
      return acc + product.qty * product.salePrice;
    }, 0);
    const total = cardData.reduce((acc, product) => {
      return acc + product.qty * product.price;
    }, 0);
    setTotalPayAmount(totalPay);
    setTotalAmount(total);
    setCardDatas(cardData);
  }, [cardData]);

  const handelAddToWish = (product) => {
    const isProductInWish = wishData?.some((item) => item?.id === product?.id);

    if (!isProductInWish) {
      dispatch(addTowish(product));
      toast.success("Product added to wish!", {
        duration: 2000,
        position: "top-right",
      });
    } else {
      dispatch(removeTowish(product));
      toast.success("Product remove sucessfully From Wishlist.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const handelSelectColor = (i, color) => {
    // Create a deep copy of cardData
    let newdata = JSON.parse(JSON.stringify(cardData));

    // Update the selectedColor of the specific item
    newdata[i].slectedColor = color;
    // Update the state to reflect the new data
    setCardDatas(newdata);
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
        <div className="col-10">
          {cardDatas?.length > 0 ? (
            cardDatas?.map((product, i) => {
              return (
                <div className="row mb-5" key={product.id}>
                  <div className="col-4">
                    {/* <img
                    src={`../../src/assets/${product?.pictures[0]}`}
                    style={{ width: "100%", height: "34rem" }}
                  /> */}
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
                      {/* <div>{showRating(product)}</div> */}
                    </div>

                    <div className="">
                      <span className="d-flex gap-2 mb-0">
                        <p className="mb-1">Availibility:</p>{" "}
                        <p style={{ color: "#9d9d9d" }} className="mb-1">
                          {product?.stock - product.qty}
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
                              <InputLabel id="demo-simple-select-label">
                                Size
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={size || product.selectedSize || ""}
                                label="Size"
                                onChange={handleChange}
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
                              gap: "5px",
                            }}
                          >
                            {product.colors.map((color, index) => (
                              <div
                                key={index}
                                onClick={() => handelSelectColor(i, color)}
                                style={{
                                  cursor: "pointer",
                                  height: "36px",
                                  width: "36px",
                                  borderRadius: "5px",
                                  background: colors[color],
                                  border:
                                    product.slectedColor === color
                                      ? "3px solid blue"
                                      : "1px solid transparent",
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <span className="d-flex gap-2 mb-0">
                        <p className="mb-1 d-flex align-items-center">
                          Quantity:
                        </p>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ border: "1px solid black" }}
                        >
                          <CardActions sx={{ padding: "0px" }}>
                            <Button
                              sx={{ padding: "0px" }}
                              size="small"
                              color="primary"
                              onClick={() => dispatch(dicQty(product.id))}
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
                            {product?.qty}
                          </span>
                          <CardActions sx={{ padding: "0px" }}>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => dispatch(incQty(product.id))}
                              sx={{ padding: "0px" }}
                            >
                              <AddIcon />
                            </Button>
                          </CardActions>
                        </div>
                      </span>
                      <p className="my-2" style={{ color: "#01a479" }}>
                        Pay Amount:{product?.salePrice * product.qty}
                      </p>
                    </div>

                    <div className="">
                      <CardActions sx={{ display: "flex", gap: "10px" }}>
                        <Card
                          className="card-icons"
                          onClick={() => handelRemoveFromCard(product)}
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
                          <span className="">Remove From Card</span>
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
                          {wishData?.some(
                            (item) => item?.id === product?.id
                          ) ? (
                            <>
                              {" "}
                              <FavoriteIcon sx={{ color: "red" }} />{" "}
                              <span>Add To Wishlist</span>
                            </>
                          ) : (
                            <>
                              {" "}
                              <FavoriteBorderOutlinedIcon />{" "}
                              <span>Add To Wishlist</span>
                            </>
                          )}
                        </Card>
                      </CardActions>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="d-flex justify-content-center align-items-center w-100 fs-4 fw-light"
              style={{ color: "#2f2f41" }}
            >
              No data found
            </div>
          )}
        </div>
        <div className="col-2">
          <h5 className="mb-1 font-weight-bold" style={{ color: "#a94242" }}>
            <span>Total Pay Amount: ₹{totalPayAmount}</span>{" "}
            <del className="ms-2">₹{totalAmount}</del>
          </h5>
          {/* <button type="button" className="btn btn-primary w-100 mt-3">
            Pay Now
          </button> */}
          <Checkout cardDatas={cardDatas} />
          {/* <Checkout /> */}
        </div>
      </div>
    </div>
  );
};

export default CardAddedData;
