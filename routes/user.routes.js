const router = require("express").Router();
const upload = require("../utils/fileupload");

const {
  createProfile,
  updateProfile,
  deleteProfile,
  login,
  authorization,
  updatePassword,
} = require("../controller/user.controller");

router.post("/login", login);

router.patch("/update/profile/:id", upload.single("profileImg"), updateProfile);

router.post("/createProfile", upload.single("profileImg"), createProfile);

router.patch("/update/profile/:id", upload.single("profileImg"), updateProfile);

router.delete("/delete/profile/:id", deleteProfile);

router.patch("/update/password/", authorization, updatePassword);

router.get("/profile", authorization, (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: req.user,
  });
});

module.exports = router;
