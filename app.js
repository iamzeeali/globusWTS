const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const userRouter = require("./routes/userRoutes");
const stateRouter = require("./routes/stateRoutes");
const cityRouter = require("./routes/cityRoutes");
const locationRouter = require("./routes/locationRoutes");
const productRouter = require("./routes/productRoutes");
const customerCategoryRouter = require("./routes/customerCategoryRoutes");
const companyBranchRouter = require("./routes/companyBranchRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const userTypeRouter = require("./routes/userTypeRoutes");

const app = express();

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

// *********************GLOBAL MIDDLEWARES*******************************

//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));

//Cookie Parser
app.use(cookieParser());

//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

//Prevent Paramter Pollution
app.use(
  hpp({
    // whitelist: [
    //   "duration",
    //   "ratingsQuantity",
    //   "ratingsAverage",
    //   "maxGroupSize",
    //   "difficulty",
    //   "price"
    // ]
  })
);

app.use(compression());

//***************************/ROUTES***********************************

app.use("/api/user", userRouter);
app.use("/api/state", stateRouter);
app.use("/api/city", cityRouter);
app.use("/api/location", locationRouter);
app.use("/api/customer-category", customerCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/company-branch", companyBranchRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/user-type", userTypeRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
