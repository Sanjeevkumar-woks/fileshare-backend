const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRATE);
    next();
  } catch (err) {
    res.send({ error: err.message });
  }
};
