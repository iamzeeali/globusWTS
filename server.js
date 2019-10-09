const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION! 🔥  Shutting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB =
  "mongodb+srv://iamzeeali:globus2015@glcluster-4yhn2.mongodb.net/globusWTS?retryWrites=true";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! 🔥  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
