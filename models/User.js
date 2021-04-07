const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "a user must input firstname"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "a user must input lastname"],
      trim: true,
    },
    profileImg: {
      type: String,
      default: "/profile-img/default.jpg",
    },
    email: {
      type: String,
      required: [true, "a user must provide a valid email"],
      unique: [true, "oops😥, email already exist"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    password: {
      type: String,
      max: 20,
      min: 8,
      required: [true, "a user must input password"],
    },
  },
  { timestamps: true }
);


//presave middleware
/**
 * mongoose presave middleware
 */
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.correctPassword = async(inputPassword, userPassword)=>{
  const validPassword = await bcrypt.compare(inputPassword, userPassword);
  return validPassword;
};

const User = mongoose.model("User",userSchema);

module.exports = User;
