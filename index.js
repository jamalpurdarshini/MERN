// //step-1
// // const express = require("express");
// import express from "express";
// import dotenv from "dotenv";
// import databaseConnection from "./utils/database.js";
// import cookieParser from "cookie-parser";
// import userRoute from "./routes/userRoute.js";
// import cors from "cors";

// databaseConnection();

// dotenv.config({
//     path:".env"
// })

// const app = express();

// app.use((req, res, next) => {
//   console.log(`➡️ ${req.method} ${req.url}`);
//   next();
// });

// //middlewares 
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cookieParser());
// const corsOptions = {
//     origin:'http://localhost:3000',
//     credentials:true
// }
// app.use(cors(corsOptions));
 
// // api
// app.use("/api/v1/user", userRoute);

// app.get("/", (req, res) => {
//   res.send("🚀 Netflix Clone Backend is Running");
// });


// app.listen(process.env.PORT,() => {
//     console.log(`Server listen at port ${process.env.PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({ path: ".env" });

const app = express();

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Updated CORS setup
const allowedOrigins = [
  "http://localhost:3000", // local React
  // "https://mern-alpha-wine.vercel.app" // deployed frontend
  "https://mern-x9xt.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("🚀 Netflix Clone Backend is Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
