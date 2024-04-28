const express = require("express");
const {
  register,
  login,
  forget_password,
  refresh_token,
} = require("../controllers/AuthController");
const {
  generate_url,
  url_callback,
  connect_github,
  callback_github,
  github_token,
} = require("../controllers/OAuth.controller");
const { send_mail } = require("../models/services/Gmail.service");

const auth = express.Router();

auth.post("/register", register);
auth.post("/login", login);
auth.post("/logout", (req, res) => {
  res.cookie("access_token", { expires: Date.now() });
  res.send({ message: "successful logout" });
});

auth.post("/forget-password", forget_password);
auth.post("/refresh-token", refresh_token);
auth.get("/google", generate_url);
auth.post("/google/callback", url_callback);
auth.get("/google/callback", url_callback);
auth.get("/github", connect_github);
auth.get("/github/callback", callback_github);
auth.post("/github/token", github_token);
auth.post("/github/code", async (req, res) => {
  await send_mail({}, req.body.email, req.body.code, "code github");
  res.send({ message: "code send" });
});
module.exports = auth;
