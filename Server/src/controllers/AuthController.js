const { Users, check_if_users_exist } = require("../models/User.models");
const jwt = require("jsonwebtoken");
const { secret, refresh_token_code } = require("../config_env");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { send_mail } = require("../models/services/Gmail.service");

//**********************************************************************************/
//************************ function for token *************************************/
//*********************************************************************************/
function generate_tokens(user) {
  return jwt.sign({ user: user }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ user: user }, refresh_token_code, {
    expiresIn: "1y",
  });
}

//**********************************************************************************/
//************************ controller for authentication ***************************/
//*********************************************************************************/

const register = async (req, res) => {
  let check_user = await check_if_users_exist(
    req.body.username,
    req.body.email
  );
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    check_user
  ) {
    return res.status(400).send({
      message:
        "A user with that username / email already exists or missing parameters",
    });
  }
  const new_user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    google_token: "",
    github_token: "",
    github_username: "",
  });
  new_user.password = bcrypt.hashSync(new_user.password, 8);
  var token = generate_tokens(new_user);

  new_user
    .save()
    .then((result) => {
      res.status(200).send({ message: "you're register" });
    })
    .catch((error) => {
      return res.status(500).send({
        message: "internal server error" + error,
        access_token: token,
      });
    });
};

const login = async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    console.log("wrong param for user");
    res.status(400).send({
      message: "incorrect email or password",
    });
  }

  try {
    let user = await Users.findOne({ email: req.body.email });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      console.log("wrong password for: " + req.body.email);
      res.status(400).send({
        message: "incorrect email or password",
      });
    }

    var token = generate_tokens(user);
    var refresh_token = generateRefreshToken(user);

    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 900000),
    });
    console.log("===============LOGIN===================");
    console.log(user);
    console.log("===============END=====================");
    res.send({
      message: "you're login",
      access_token: token,
    });
  } catch (err) {
    console.log("we don't have this user: " + req.body.email);
    res.status(400).send({
      message: "incorrect email or password",
    });
  }
};

const forget_password = async (req, res) => {
  //console.log(req.body.email);
  if (!req.body.email) {
    console.log("it's missing one param for target the routes url");
    res.status(400).send({
      message: "email is missing",
    });
    return;
  }

  try {
    const user = await Users.findOne({ email: req.body.email }).exec();
    user.password = bcrypt.hashSync("toto", 8);
    await user.save();
    await send_mail(
      {},
      req.body.email,
      "your new password it's toto",
      "your password have change"
    );
    res.send({ message: "a mail as send to this email " + req.body.email });
  } catch (rej) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const refresh_token = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, refresh_token_code, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "bad token" });
    }

    const refreshedToken = generate_tokens(user);
    res.send({
      accessToken: refreshedToken,
    });
  });
};
module.exports = {
  register,
  login,
  forget_password,
  refresh_token,
  generateRefreshToken,
  generate_tokens,
};
