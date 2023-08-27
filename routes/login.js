const router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserLogin = require("../models/user");
const dotenv = require("dotenv").config();
const jwt_decode = require("jwt-decode");

router.post("/", async (req, res) => {
  
  const decoded=req.body
  const { email, email_verified, name, picture } = decoded;
  const isUserExist =await UserLogin.findOne({email});
 console.log(isUserExist);
  if (isUserExist) {
    try {
      const storedToken = isUserExist.jwt_token;
      jwt.verify(storedToken, process.env.JWT_SECRATE);
      if (email_verified);
      res.send({ email, email_verified, name, picture,"jwt_token": storedToken });
    } catch (err) {
      res.send({ error: err.message });
    }
  } else if (email_verified) {
    var jwt_token = jwt.sign({ email }, process.env.JWT_SECRATE);
    const user = new UserLogin({
      email, email_verified, name, picture, jwt_token
    });
    const response = await user.save();

    //await UserLogin.insertOne({email, email_verified, name, picture, jwt_token})
    res.send({ email, email_verified, name, picture, jwt_token });
  } else {
    res.send({ error: "login failed!!" });
  }
});

router.delete("/", async (req, res) => {
  const response = await UserLogin.deleteMany({});
  res.send(response);
});

module.exports = router;

//router.post("/login", async (req, res) => {
//  const { Username, Password } = req.body;
//  const isUserExist = await getUserByName(Username);
//  console.log(isUserExist);
//
//  if (isUserExist) {
//    const storedDbPassword = isUserExist.Password;
//    const isPasswordMatch = await bcrypt.compare(Password, storedDbPassword);
//    console.log(isPasswordMatch);
//    if (!isPasswordMatch) {
//      res.status(400).send({ msg: "Invalid Credentials" });
//      return;
//    }
//    if (isUserExist && isPasswordMatch) {
//      res.send({ msg: "Sucessfull Login" });
//    }
//  } else {
//    res.status(400).send({ msg: "Invalid Credentials" });
//  }
//});
//
//router.get("/", async (req, res) => {
//  const users = await getUsers(req);
//  res.send(users);
//});
//
//export const userRoute = router;
//
//
//
//
//
//
//
//
//module.exports = router;
