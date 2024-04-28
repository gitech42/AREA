const { Services } = require("../models/Service.models");

const getServices = async (req, res) => {
  const services = await Services.find()
    .populate("reactions")
    .populate("actions");
  let result = [];

  for (const service of services) {
    if (
      ["Google Calendar", "Youtube"].includes(service.name) &&
      req.user.user.google_token === ""
    ) {
      continue;
    }
    if (["Github"].includes(service.name) && req.user.user.github_token === "")
      continue;
    result.push(service);
  }
  res.send({ services: result });
};

const getService = async (req, res) => {
  try {
    const services = await Services.find({ name: res.params.name })
      .populate("reactions")
      .populate("actions");
    res.send({ services: services });
  } catch (e) {
    console.log("Service " + res.params.name + " not found");
    res.status(404).send({ message: "Service not found" });
  }
};

module.exports = {
  getServices,
  getService,
};
