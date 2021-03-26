const express = require("express");

const mongoose = require("mongoose");

const app = express();

const path = require("path");

const mainRoute = require("./routes/app.routes");

const studentRoute = require("./routes/student.routes");

//to set the view engine---middleware---setting a templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", mainRoute);
app.use("/student", studentRoute);

//handling 404 errors on get request
app.get("*", (req, res, next) => {
  res.send("404 page not found😥😥");
});

//handling all https 404 error
app.all("*", (req, res, next) => {
  res.send("404 page not found😥😥");
});

const PORT = 3002;

//connecting to database
mongoose
  .connect("mongodb://127.0.0.1:27017/stusents", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection is successful.....");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
