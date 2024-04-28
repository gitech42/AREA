const express = require("express");
const { get_user, delete_user } = require("../controllers/UserControllers");
const { authenticateToken } = require("../middleware/auth.middleware");
const {
  getArea,
  editArea,
  deleteArea,
  newArea,
  getAreas,
  get_pornhub,
} = require("../controllers/Area.controller");
const user = express.Router();

user.use(authenticateToken);
// user.get("/:id", get_user);
// user.delete("/:id", delete_user);
user.get("/area/pornhub", get_pornhub);
user.get("/area/:id", getArea);
user.put("/area/:id", editArea);
user.delete("/area/:id", deleteArea);
user.post("/area/", newArea);
user.get("/areas/", getAreas);
module.exports = user;
