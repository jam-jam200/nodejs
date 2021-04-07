const express = require("express");

const mongoose = require("mongoose");

const app = express();

const path = require("path");

const mainRoute = require("./routes/app.routes");

const studentRoute = require("./routes/student.routes");

const userRoute = require("./routes/user.routes");

const userUpdateRoute = require("./routes/userUpdate.routes");

const API = require("./utils/apiError");

const productRoute = require("./routes/products.routes");
// const APIError = require("./utils/apiError");
//to set the view engine---middleware---setting a templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for static folders
app.use("/", express.static(path.join(__dirname, "/uploads")));
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", mainRoute);
app.use("/student", studentRoute);

//api route
app.use("/api/products", productRoute);
app.use("/api/profile", userRoute);

app.all("*", (req, res, next) => {
  next(new API("oops page not found", 404));
});

//global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

//handling 404 errors on get request
// app.get("*", (req, res, next) => {
//   res.send("404 page not found😥😥");
// });

//handling all https 404 error
app.all("*", (req, res, next) => {
  res.send("404 page not found😥😥");
});

const PORT = 3002;

//connecting to database
mongoose
  .connect("mongodb://127.0.0.1:27017/esales", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connection is successful.....");
  })
  .catch((err) => {
    console.log(err);
  });

//server running
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
