const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersModel = new Schema({
  id: { type: Number, require: true },
  username: { type: String, require: true },
  password: { type: String },
  email: { type: String, require: true },
  github_token: {
    type: String,
  },
  github_username: {
    type: String,
  },
  google_token: {
    type: String,
  },
});

module.exports = {
  Users: mongoose.model("User", UsersModel),
  check_if_users_exist: check_if_users_exist,
  check_if_mail_exist: check_if_mail_exist,
};

async function check_if_users_exist(username, email) {
  let Users = mongoose.model("User", UsersModel);

  let user = await Users.findOne({ username: username });
  if (user) {
    return true;
  }
  user = await Users.findOne({ email: email });
  if (user) {
    return true;
  }
  return false;
}

async function check_if_mail_exist(email) {
  let Users = mongoose.model("User", UsersModel);

  let user = await Users.findOne({ email: email });
  if (user) {
    return true;
  }
  return false;
}
