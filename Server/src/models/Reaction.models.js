const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const Schema = mongoose.Schema;

const ReactionsModels = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: false,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Services",
    unique: false,
  },
  param: [
    {
      type: String,
    },
  ],
});

let Reactions = mongoose.model("Reactions", ReactionsModels);

module.exports = {
  Reactions,
};
