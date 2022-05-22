var express = require("express");
var router = express.Router();
var User = require("../models/user");
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("email is reqiured"),
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 chars long"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 3 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is reqiured"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password field is required"),
  ],
  signin
);

router.get("/testRoute", isSignedIn, (req, res) => {
  res.send(req.auth);
});

router.get("/signout", signout);

module.exports = router;
