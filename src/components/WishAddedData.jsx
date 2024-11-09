import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { removeToCard, removeTowish } from "../redux/slice";

const WishAddedData = () => {
  const { wishData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log("🚀 ~ CardAddedData ~ wishData:", wishData);
  return (
    <div className="cardAddedData">
      {wishData?.length > 0 ? (
        wishData?.map((product) => (
          <div key={product.id} className="product">
            <Card sx={{ maxWidth: 345 }}>
              <img
                src={`../../src/assets/${product.pictures[0]}`}
                style={{ width: "100%" }}
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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <del>₹{product?.price}</del>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#01a479" }}>
                    ₹{product?.salePrice}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(removeTowish(product))}
                >
                  Remove
                </Button>
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
  );
};

export default WishAddedData;
