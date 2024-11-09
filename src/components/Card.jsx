import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCard, addTowish } from "../redux/slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

// Add this to render toast notifications at the top level of your app (like in App.js)

export default function MediaCard({ filteredProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Adjust as needed
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cardData, wishData } = useSelector((state) => state.products);
  const handleAddtoCard = (product) => {
    const isProductInCart = cardData.some((item) => item.id === product.id);

    if (!isProductInCart) {
      dispatch(
        addToCard({
          ...product,
          qty: 1,
          selectedSize: product?.size[0],
          slectedColor: product?.colors[0],
        })
      );
      toast.success("Product added to cart!", {
        duration: 3000, // Toast will be visible for 3 seconds
        position: "top-right", // Position the toast at the top-right
      });
    } else {
      // dispatch(removeToCard(product));
    }
  };
  // Calculate displayed products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handelAddToWish = (product) => {
    const isProductInWish = wishData.some((item) => item.id === product.id);

    if (!isProductInWish) {
      dispatch(addTowish(product));
      toast.success("Product added to wish!", {
        duration: 3000, // Toast will be visible for 3 seconds
        position: "top-right", // Position the toast at the top-right
      });
    } else {
      // dispatch(removeTowish(product));
      // toast.success("Product remove sucessfully", {
      //   style: {
      //     // border: "1px solid #713200",
      //     padding: "10px",
      //     color: "#713200",
      //   },
      //   iconTheme: {
      //     primary: "#713200",
      //     secondary: "#FFFAEE",
      //   },
      // });
    }
  };

  return (
    <>
      <div className="products">
        {currentProducts?.length > 0 ? (
          currentProducts?.map((product) => (
            <div key={product.id} className="product">
              <Card sx={{ maxWidth: 345 }}>
                <img
                  src={`../../src/assets/${product.pictures[0]}`}
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ height: "64px" }}
                  >
                    {product?.name}
                  </Typography>
                  <div className="d-flex justify-content-center gap-2">
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <del>₹{product?.price}</del>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#01a479" }}>
                      ₹{product?.salePrice}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <span className="card-icons">
                    <ShuffleOutlinedIcon />
                  </span>
                  <span
                    className="card-icons"
                    onClick={() => handleAddtoCard(product)}
                  >
                    <ShoppingCartOutlinedIcon
                      sx={
                        cardData.some((item) => item.id === product.id)
                          ? { color: "blue" }
                          : {}
                      }
                    />
                  </span>
                  <span
                    className="card-icons"
                    onClick={() => handelAddToWish(product)}
                  >
                    {wishData.some((item) => item.id === product.id) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </span>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center w-100 fs-4 fw-light"
            style={{ color: "#2f2f41" }}
          >
            No data found
          </div>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        />
      </div>
    </>
  );
}
MediaCard.propTypes = {
  filteredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      salePrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};
