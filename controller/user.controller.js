//create product
//201 means created
//200 means successful
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const APIError = require("../utils/apiError");
const {
  createUserProfile,
  updateUserProfile,
} = require("../utils/userValidation");
const { use } = require("../routes/user.routes");

/**
 *
 * @param {MongooseObject} userId from mongoose
 * @returns {String} just signed token with the user information and expiration
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createProfile = async (req, res, next) => {
  try {
    const newProfile = {
      ...req.body,
    };
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return next(
        new APIError(`${req.body.email} is taken, try a different email`, 400)
      );
    }

    const { error } = createUserProfile(newProfile);
    if (error) {
      return next(new APIError(error, 401));
    }
    const profile = await User.create(newProfile);
    res.status(201).json({
      status: "sucess",
      message: profile,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checks if user record does not exist in the database
    if (!user) {
      return next(new APIError("user does not exist", 404));
    }

    //checks for password using bcrypt to compare res.body.password and user password, it returns eother true or false
    const correctpassword = await user.correctPassword(
      req.body.password,
      user.password
    ); //returns true // false

    if (!correctpassword) {
      return next(new APIError("invalid details"), 400);
    }
    let token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(token);

    if (!token) {
      return next(new APIError("please login to get access", 401));
    }

    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decode);

    let currentUser = await User.findById({ _id: decode.id });

    if (!currentUser) {
      return next(new APIError("unauthorized user", 401));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    let updateProfile;
    if (!req.file) {
      updateProfile = {
        ...req.body,
      };
    } else {
      updateProfile = {
        ...req.body,
        profileImg: `/profile-img/${req.file.filename}`,
      };
    }
    const { error } = updateUserProfile(updateProfile);
    if (error) {
      return next(new APIError(error, 400));
    }

    const profile = await User.findByIdAndUpdate(
      /**
       * you are sending a data from the body, the data from the api is in the req body, the new true means the database should pick the new update and discard the old
       */
      { _id: req.params.id },
      updateProfile,
      { new: true }
    );
    res.status(201).json({
      status: "success",
      message: profile,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "profile has been deleted",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const correctPassword = await user.correctPassword(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return next(new APIError("incorrect credentials", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    res.status(201).json({
      status: "success",
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.role = () => {

}
