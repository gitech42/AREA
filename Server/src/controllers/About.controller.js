const { Services } = require("../models/Service.models");

const getAbout = async (req, res, next) => {
  try {
    let result = {
      client: {
        host: req.ip === "::1" ? "127.0.0.1" : req.ip,
      },
      server: {
        current_time: new Date().getTime(),
        services: [],
      },
    };

    let services = await Services.find();
    for (const service in services) {
      const req_reactions = await Services.find({
        name: services[service].name,
      }).populate("reactions");

      const req_actions = await Services.find({
        name: services[service].name,
      }).populate("actions");
      const reactions = req_reactions[0].reactions;
      const actions = req_actions[0].actions;

      let get_all_reactions = [];
      let get_all_actions = [];

      for (const action of actions) {
        get_all_actions.push({
          name: action.name,
          description: action.description,
        });
      }

      for (const reaction of reactions) {
        get_all_reactions.push({
          name: reaction.name,
          description: reaction.description,
        });
      }
      let l = {
        name: services[service].name,
        action: get_all_actions,
        reactions: get_all_reactions,
      };
      result.server.services.push(l);
    }
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAbout,
};
