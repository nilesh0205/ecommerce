import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Slider } from "@mui/material";
import { filterData, maxPriceMinPrice } from "../redux/slice";
import products from "../../products";
import MediaCard from "././Card";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [size, setSize] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const { filteredProducts, maxPri, minPri } = useSelector(
    (state) => state.products
  );
  console.log("🚀 ~ MainLayout ~ maxPri:", maxPri);
  const [filterObj, setFilterObj] = useState({
    category: "",
    price: [minPrice, maxPrice],
    color: "",
    size: "",
  });

  const handleRangeChange = (event, newValue) => {
    console.log("🚀 ~ handleRangeChange ~ newValue: ", newValue);

    setFilterObj((prve) => {
      const newdata = {
        ...prve,
        price: newValue,
      };

      dispatch(filterData(newdata));
      return newdata;
    });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFilterObj((prve) => {
      const newdata = {
        ...prve,
        category: value,
      };
      dispatch(filterData(newdata));
      return newdata;
    });
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    setFilterObj((prve) => {
      const newdata = {
        ...prve,
        color: value,
      };
      dispatch(filterData(newdata));
      return newdata;
    });
  };

  const handelSize = (event) => {
    const { value } = event.target;
    setFilterObj((prve) => {
      const newdata = {
        ...prve,
        size: value,
      };
      dispatch(filterData(newdata));
      return newdata;
    });
  };

  const unicKey = (name) => {
    return [...new Set(products.flatMap((item) => item[name]))];
  };

  useEffect(() => {
    const uniqueCat = unicKey("category");
    setUniqueCategories(...uniqueCategories, uniqueCat);
    const colors = unicKey("colors");
    setUniqueColors(colors);
    const productSize = unicKey("size");
    setSize(...size, productSize);
    const prices = products.map((product) => product.price);
    const min = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setMaxPrice(maxPrice);
    setMinPrice(min);
    setFilterObj((prve) => {
      const newdata = {
        ...prve,
        price: [min, maxPrice],
      };

      return newdata;
    });
    dispatch(maxPriceMinPrice());
  }, []);

  return (
    <div className="mainLayout">
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{ gap: "2rem", width: "15%" }}
      >
        <div className="card range">
          {console.log("filterObj.price", filterObj.price)}
          <h4>Filter by Price</h4>
          <Slider
            value={filterObj.price}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            // getAriaLabel={(index) => (index === 0 ? "Min price" : "Max price")}
          />
          <p>
            Price Range: {minPri} to {maxPri}
          </p>
        </div>
        <div className="card category">
          <h4>Filter by Categories</h4>
          <form>
            {uniqueCategories.map((category, index) => (
              <div key={index} className="d-flex" style={{ gap: "7px" }}>
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={filterObj.category === category}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </form>
        </div>
        <div className="card color">
          <h4>Filter by Color</h4>
          <form>
            <div className="row col">
              {uniqueColors.map((uniquecolor, index) => (
                <div
                  key={index}
                  className="col-6 d-flex align-items-center mb-2 gap-2"
                >
                  <input
                    type="radio"
                    id={uniquecolor}
                    name="uniquecolor"
                    value={uniquecolor}
                    checked={filterObj.color === uniquecolor}
                    onChange={handleColorChange}
                  />
                  <label htmlFor={uniquecolor}>{uniquecolor}</label>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="card size">
          <h4>Filter by Size</h4>
          <form>
            <div className="row col">
              {size.map((size, index) => (
                <div
                  key={index}
                  className="col-6 d-flex align-items-center mb-2 gap-2"
                >
                  <input
                    type="radio"
                    id={size}
                    name="size"
                    value={size}
                    checked={filterObj.size === size}
                    onChange={handelSize}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </form>
        </div>
      </Box>

      <div className="w-100">
        <MediaCard filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default MainLayout;
