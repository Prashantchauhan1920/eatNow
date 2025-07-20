const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "Mynameisqwertyuiopbyebye$#"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    //password must be atleast 5 characters long
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await User.findOne({email});
    if(!userData){
        return res.status(400).json({errors : "Try logging in with correct credentials" });
    }
    if(req.body.password !== userData.password){
        return res.status(400).json({errors : "Try logging in with correct credentials" });
    }
    const data = {
        user:{
            id:userData.id
        }
    }
    const authToken = jwt.sign(data,jwtSecret)
    return res.json({success : true,authToken:authToken})
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
