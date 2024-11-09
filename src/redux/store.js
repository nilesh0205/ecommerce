// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import productsReducer from "./slice";

// // Define persist configuration
// const persistConfig = {
//   key: "root", // Key for storage
//   storage, // Type of storage
// };

// // Apply persist reducer to the products reducer
// const persistedReducer = persistReducer(persistConfig, productsReducer);

// // Create the store
// export const store = configureStore({
//   reducer: {
//     products: persistedReducer, // Use the persisted reducer
//   },
// });

// // Create a persistor for the store
// export const persistor = persistStore(store);
