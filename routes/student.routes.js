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
        const id = parseInt(req.params.id);
        const student = data.find((students) => {
            if(id === students.id) {
                return students;
            }
        });
        res.status(200).json({
            student,
        });

    res.send(
        `<h1>this is ${student.name} and his email is ${student.email} He is position number ${student.id}</h1>`
    );
});


module.exports = studentRouter;
