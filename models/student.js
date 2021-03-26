const mongoose = require("mongoose");



const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required,
    }
});

const Student = mongoose.model(student, )