const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routers/auth");
const user = require("./routers/user");
const cookieParser = require("cookie-parser");
const { create_service } = require("./models/Service.models");
const { getApks } = require("./controllers/Download.controller");
const { getAbout } = require("./controllers/About.controller");
const RouterService = require("./routers/Service.router");
const app = express();
const port = 8080;
var useragent = require("express-useragent");
const { Areas } = require("./models/Areas.models");
const { run_script } = require("./run_area");
const path = require("node:path");
const { fork, isMaster } = require("cluster");

app.use(cookieParser());
app.use(express.static("/public"));
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/image/:file", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  res.sendFile("/public/" + req.params.file, options, (err) => {
    if (err) {
      console.log("Error during download");
      res.status(500).send({ message: "Internal Servor error" });
      return;
    } else {
      console.log("send file...");
    }
  });
});
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/service", RouterService);
app.get("/download", getApks);
app.get("/about.json", getAbout);
if (isMaster) {
app.listen(port, async () => {
  create_service();
  fork()
  console.log(`Example app listening on port ${port}!`);
});
}
else {
  run_script();
}

module.exports = {
  app: app,
};
