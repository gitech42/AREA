const path = require("path");

const getApks = async (req, res, next) => {
  console.log(__dirname);
  var options = {
    root: path.join(__dirname),
  };

  res.sendFile("public/client.apk", options, (err) => {
    if (err) {
      console.log("Error during download");
      next(err);
    }
    console.log("send file...");
  });
};

module.exports = {
  getApks,
};
