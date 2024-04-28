const jwt = require("jsonwebtoken");
const { secret } = require("../config_env");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ message: "bad token" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).send({ message: "bad token" });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
