const { Users } = require("../models/User.models");

const get_user = (req, res, next) => {
  res.send({ user: req.user });
};

const delete_user = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete({ username: req.body.email }).exec();
    res.send({ message: "user is deleted" });
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { get_user, delete_user };
