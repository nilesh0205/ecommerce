// src/features/products/productsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import products from "../../products";

const initialState = {
  originalProducts: products,
  filteredProducts: products,
  cardData: [],
  wishData: [],
  maxPri: "",
  minPri: "",
  user: {
    isAuthenticated: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetState: () => initialState,
    signInSignup: (state, action) => {
      state.user.isAuthenticated = action.payload;
    },
    filterData: (state, action) => {
      const { category, price, color, size } = action.payload;
      const data = state.originalProducts.filter((product) => {
        const inPriceRange =
          product.price >= price[0] && product?.price <= price[1];
        const inCategory = !category || product?.category === category;
        const inColor = !color || product?.colors?.includes(color);
        const inSize = !size || product?.size?.includes(size);
        return inPriceRange && inCategory && inColor && inSize;
      });
      state.filteredProducts = data;
      const prices = data.map((product) => product.price);
      const min = Math.min(...prices);
      const maxPri = Math.max(...prices);
      state.maxPri = maxPri;
      state.minPri = min;
    },

    maxPriceMinPrice: (state) => {
      const prices = state.filteredProducts.map((product) => product.price);
      const min = Math.min(...prices);
      const maxPri = Math.max(...prices);
      state.maxPri = maxPri;
      state.minPri = min;
    },

    addToCard: (state, action) => {
      const productIndex = state.cardData.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (productIndex !== -1) {
        state.cardData[productIndex].qty = action.payload.qty;
      } else {
        state.cardData = [...state.cardData, { ...action.payload }];
      }
    },
    removeToCard: (state, action) => {
      state.cardData = state.cardData.filter(
        (product) => product.id !== action.payload.id
      );
    },
    addTowish: (state, action) => {
      state.wishData = [...state.wishData, action.payload];
    },
    removeTowish: (state, action) => {
      state.wishData = state.wishData.filter(
        (product) => product.id !== action.payload.id
      );
    },
    incQty: (state, action) => {
      const singleData = state.cardData.findIndex(
        (item) => item.id === action.payload
      );
      if (
        singleData !== -1 &&
        state.cardData[singleData].qty < state.cardData[singleData].stock
      ) {
        state.cardData[singleData].qty += 1;
      }
    },
    dicQty: (state, action) => {
      const singleData = state.cardData.findIndex(
        (item) => item.id === action.payload
      );
      if (singleData !== -1 && state.cardData[singleData].qty > 1) {
        state.cardData[singleData].qty -= 1;
      }
    },
  },
});

export const {
  filterData,
  addToCard,
  addTowish,
  removeToCard,
  removeTowish,
  incQty,
  dicQty,
  maxPriceMinPrice,
  signInSignup,
  resetState,
} = productsSlice.actions;

export default productsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import products from "../../products"; // Importing initial products data

// const initialState = {
//   originalProducts: products, // Original products list
//   filteredProducts: products, // Products list after filtering
//   cardData: [], // Cart data
//   wishData: [], // Wishlist data
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     // Filter products based on category, price, color, and size
//     filterData: (state, action) => {
//       const { category, price, color, size } = action.payload;
//       const data = state.originalProducts.filter((product) => {
//         const inPriceRange =
//           product.price >= price[0] && product?.price <= price[1];
//         const inCategory = !category || product?.category === category;
//         const inColor = !color || product?.colors?.includes(color);
//         const insize = !size || product?.sizes?.includes(size); // Adjusted to check sizes

//         return inPriceRange && inCategory && inColor && insize;
//       });
//       state.filteredProducts = data; // Update filtered products
//     },
//     // Add product to cart or update quantity
//     addToCard: (state, action) => {
//       const productIndex = state.cardData.findIndex(
//         (item) => item?.id === action.payload?.id
//       );
//       if (productIndex !== -1) {
//         // Update quantity if already in cart
//         state.cardData[productIndex].qty = action.payload.qty;
//       } else {
//         // Add new product to cart
//         state.cardData = [...state.cardData, { ...action.payload }];
//       }
//     },
//     // Remove product from cart
//     removeToCard: (state, action) => {
//       state.cardData = state.cardData.filter(
//         (product) => product.id !== action.payload.id
//       );
//     },
//     // Add product to wishlist
//     addTowish: (state, action) => {
//       state.wishData = [...state.wishData, action.payload];
//     },
//     // Remove product from wishlist
//     removeTowish: (state, action) => {
//       state.wishData = state.wishData.filter(
//         (product) => product.id !== action.payload.id
//       );
//     },
//     // Increment product quantity in cart
//     incQty: (state, action) => {
//       const singleData = state.cardData.findIndex(
//         (item) => item.id === action.payload
//       );
//       if (
//         singleData !== -1 &&
//         state.cardData[singleData].qty < state.cardData[singleData].stock
//       ) {
//         state.cardData[singleData].qty += 1; // Increment quantity
//       }
//     },
//     // Decrement product quantity in cart
//     dicQty: (state, action) => {
//       const singleData = state.cardData.findIndex(
//         (item) => item.id === action.payload
//       );
//       if (singleData !== -1 && state.cardData[singleData].qty > 1) {
//         state.cardData[singleData].qty -= 1; // Decrement quantity
//       }
//     },
//   },
// });

// // Export actions for use in components
// export const {
//   filterData,
//   addToCard,
//   addTowish,
//   removeToCard,
//   removeTowish,
//   incQty,
//   dicQty,
// } = productsSlice.actions;

// // Export the reducer to be used in the store
// export default productsSlice.reducer;
