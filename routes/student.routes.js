const express = require("express");

const studentRouter = express.Router();

const data = require("../data");

//query parameters
studentRouter.get("/api/student", (req, res, next)=>{
    res.status(200).json({
        data,
    });
});

studentRouter.get("/", (req, res, next)=>{
    res.render("student/studentList.ejs", {
        title:"student 🤗🤗",
        student: data,
    });
})

studentRouter.get("/:id/:name", (req, res, next)=>{
    // console.log(req.params);
    res.send(`Student number ${req.params.id}`);
});

module.exports = studentRouter;
