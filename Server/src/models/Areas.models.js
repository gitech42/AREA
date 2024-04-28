const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AreasModels = new Schema({
  name: {
    type: String,
    require: false,
  },
  action: {
    type: Schema.Types.ObjectId,
    ref: "Actions",
  },
  reaction: {
    type: Schema.Types.ObjectId,
    ref: "Reactions",
  },
  user: {
    type: String,
    require: true,
  },
  param_action: [
    {
      type: String,
    },
  ],
  param_reaction: [
    {
      type: String,
    },
  ],
  date: Date,
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
});

AreasModels.set("toJSON", { getters: true, virtuals: false });

module.exports = {
  Areas: mongoose.model("Areas", AreasModels),
};
