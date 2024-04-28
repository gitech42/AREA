const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PornHubModels = new Schema({
    name: { type: String, require:true},
    user: { type: String, require: true},
});

let porn = mongoose.model("Pornhub", PornHubModels);

module.exports = {
    porn,
}