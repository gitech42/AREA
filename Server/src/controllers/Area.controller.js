const { Areas } = require("../models/Areas.models");
const { Actions } = require("../models/Actions.models");
const { Reactions } = require("../models/Reaction.models");
const { Users } = require("../models/User.models");
const { Services } = require("../models/Service.models");
const { porn } = require("../models/Pornhub.models");

const getArea = async (req, res) => {
  try {
    const area = await Areas.find({ _id: req.params.id })
      .populate("reaction")
      .populate("action");
    res.send({ area: area });
  } catch (e) {
    console.log("Area " + req.params.id + " not found");
    res.status(404).send({ message: "Area not found" });
  }
};

const newArea = async (req, res) => {
  if (
    !req.body.area ||
    !req.body.area.action ||
    !req.body.area.reaction ||
    !req.body.area.reaction.name ||
    !req.body.area.action.name ||
    !req.body.area.reaction.param ||
    !req.body.area.action.param
  ) {
    res.status(401).send({ message: "parameters is missing !" });
  }

  try {
    let check_token = (user, is_for_github) => {
      return is_for_github
        ? user.github_token === null
        : user.google_token === null;
    };
    let google_service = ["Gmail", "Youtube", "Google Calendar"];
    let github_service = ["Github"];
    let act = await Actions.findOne({ name: req.body.area.action.name });
    let react = await Reactions.findOne({ name: req.body.area.reaction.name });
    let user = await Users.findOne({ email: req.user.user.email });

    console.log(act);
    let Service_action = await Services.findOne({ _id: act.service });
    let Service_reaction = await Services.findOne({ _id: react.service });

    if (react === null || act === null) {
      res.status(401).send({ message: "wrong parameter" });
      return;
    } else {
        const newArea = await Areas.create({
          action: act,
          reaction: react,
          param_action: req.body.area.action.param,
          param_reaction: req.body.area.reaction.param,
          user: user.email,
          active: req.body.area.active,
          date: new Date(),
        });

        await Users.updateMany(
          { _id: newArea.User },
          { $push: { areas: newArea._id } }
        );
        console.log("=======POST new area in database=====");
        console.log(req.body.area);
        console.log("============");

        res.send({ area: newArea });
    }
  } catch (e) {
    console.log(e);
    console.log("Area " + req.params.name + " not found");
    res.status(404).send({ message: "Area not found" });
  }
};

const editArea = async (req, res) => {
  try {
    let area = await Areas.findOne({ name: req.params.name }).exec();

    if (req.body.activate != null) {
      area.active = req.body.activate;
    }
    await area.save();
    res.json({ message: "area edited !" });
  } catch (e) {
    console.log(e);
    console.log(
      "\n\nError when I want to change " + req.param.name + " area\n\n"
    );
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteArea = async (req, res) => {
  try {
    const param_area = req.params.id;
    const product = await Areas.findOne({_id: param_area });
    //let user = await Users.findOne({ email: req.user.user.email });

    //await Users.updateMany(
    //  { _id: product.user },
    //  { $pull: { areas: product._id } }
    //);
    await product.remove();

    res.send({ message: "this area is successful deleted" });
  } catch (e) {
    res.status(401).send({ message: "area is not find or already delete" });
  }
};

const getAreas = async (req, res) => {
  let list = [];
  let user = await Users.findOne({ email: req.user.user.email });
  console.log(req.user);
  let areas = await Areas.find({ user: user.email });

  console.log("========GET areas============");
  console.log(areas);
  console.log("========END============");
  for (const area of areas) {
    let reaction = await Reactions.findOne({ _id: area.reaction._id });
    let action = await Actions.findOne({ _id: area.action._id });
    let service_action = await Services.findOne({ _id: action.service });
    let service_reaction = await Services.findOne({ _id: reaction.service });
    
    list.push({
      id: area._id,
      reaction: reaction,
      action: action,
      active: area.active,
      date: area.date,
      Service_action: { file: service_action.file, name: service_action.name },
      Service_reaction: {
        file: service_reaction.file,
        name: service_reaction.name,
      },
      param_action: area.param_action,
      param_reaction: area.param_reaction,
    });
  }
  res.send({ areas: list });
};

const get_pornhub = async (req, res) => {
  let link_for_pornhub = await porn.findOne({ user: req.user.user.email });
  res.send(link_for_pornhub);
};

module.exports = {
  getArea,
  getAreas,
  editArea,
  newArea,
  deleteArea,
  get_pornhub,
};
