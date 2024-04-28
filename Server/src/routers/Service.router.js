const express = require("express");
const { authenticateToken } = require("../middleware/auth.middleware");
const { getServices } = require("../controllers/Service.controller");
const RouterService = express.Router();

RouterService.use(authenticateToken);
RouterService.get("/", getServices);
RouterService.get("/:name", getServices);

module.exports = RouterService;
