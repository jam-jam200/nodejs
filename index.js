const express = require("express");

const app = express();

const mainRoute = require("./routes/app.routes");

const studentRoute = require("./routes/student.routes");

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(express.static("./public"));

app.use("/", mainRoute);

app.use("/student", studentRoute);

//handling 404 errors on get request
app.get("*", (req, res, next)=>{
    res.send("404 page not found😥😥");
});

//handling all https 404 error
app.all("*", (req, res, next)=>{
    res.send("404 page not found😥😥");
});


const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("server is running on " + PORT);
});