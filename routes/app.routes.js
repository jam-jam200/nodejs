const express = require("express");

const router = express.Router();


//ROUTE
router.get("/", (req, res, next)=>{
    res.render("index.ejs", {
        title: "Home 😊😊",
    });
});

router.get("/about", (req, res, next)=>{
    res.render("about.ejs", {
        title: "About-us 😉😉",
    });
});

router.get("/contact", (req, res, next)=>{
    res.render("contact.ejs", {
        title: "Contact-us 😋😋"
    });
});

router.post("/message", (req, res, next)=>{
    res.send(req.body);
});

module.exports = router;
