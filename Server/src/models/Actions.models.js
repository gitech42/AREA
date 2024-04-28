const mongoose = require("mongoose");
const { send_email } = require("./Reaction.models");
const Schema = mongoose.Schema;

const ActionsModels = new Schema({
  name: { type: String, require: true, action: true },
  param: [
    {
      type: String,
    },
  ],
  service: {
    type: Schema.Types.ObjectId,
    ref: "Services",
  },
  description: {
    type: String,
  },
});

let Actions = mongoose.model("Actions", ActionsModels);

ActionsModels.method("getAction", () => {
  return {
    name: this.name,
    description: this.description,
  };
});

module.exports = {
  Actions,
};
