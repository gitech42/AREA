const { google } = require("googleapis");
const OAuth2Data = require("../code_secret_client_628498484335-sl06q2au17b1522j8bo7lhusf3caq0dl.apps.googleusercontent.com.json");
const jwt_decode = require("jwt-decode");
const { Users, check_if_mail_exist } = require("../models/User.models");
const { generate_tokens, generateRefreshToken } = require("./AuthController");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { secret } = require("../config_env");
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
const qs = require("qs");

//////////////////////////////////////////////////////
///////////   GOOOGLE CONNECTION  ////////////////////
/////////////////////////////////////////////////////
const generate_url = async (req, res) => {
  // Generate an OAuth URL and redirect there
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  });
  res.send(url);
};

async function create_user_if_not_exist(user) {
  let doc_user = {
    username: "",
    email: user.email,
    google_token: "",
    github_token: "",
    github_username: "",
  };
  let check_user = await check_if_mail_exist(user.email);
  let new_user;
  if (check_user) {
    try {
      new_user = await Users.findOne({ email: user.email }).exec();
      return new_user;
    } catch (e) {
      console.log(e);
      throw 42;
    }
  }
  new_user = new Users(doc_user);
  await new_user.save();
  return new_user;
}

async function loginFlutter(tokens, access_token, res, is_android = false) {
  try {
    let user = jwt_decode(tokens.id_token);
    await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      requiredAudience: CLIENT_ID,
    });
    let usermodel = await create_user_if_not_exist(user);
    if (is_android) {
      usermodel.google_token = access_token;
    } else {
      usermodel.google_token = tokens.access_token;
    }
    res.cookie("access_token", generate_tokens(usermodel), {
      expires: new Date(Date.now() + 900000),
    });
    res.cookie("refresh_token", generateRefreshToken(usermodel), {
      expires: new Date(Date.now() + 900000),
    });
    await usermodel.save();
    console.log("===============LOGIN===================");
    console.log(usermodel);
    console.log("===============END=====================");
    if (!is_android) {
      res.redirect("http://localhost:8081/dashboard");
    } else {
      res.send({
        message: "you're login",
        access_token: generate_tokens(usermodel),
        refresh_token: generateRefreshToken(usermodel),
      });
    }
  } catch (e) {
    console.log("\n\nError:");
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
}

const url_callback = async (req, res) => {
  const code = req.query.code;
  try {
    if (code) {
      // Get an access token based on our OAuth code
      oAuth2Client.getToken(code, function (err, tokens) {
        //console.log(tokens);
        if (err) {
          console.log("Error authenticating");
          console.log(err);
        } else {
          console.log("Successfully authenticated");
          oAuth2Client.setCredentials(tokens);
          loginFlutter(tokens, "", res, false);
        }
      });
    } else {
      loginFlutter(req.body, req.body.access_token, res, true);
    }
  } catch (e) {
    console.log(e);
  }
};

//////////////////////////////////////////////////////
///////////   GITHUB CONNECTION WEB //////////////////
/////////////////////////////////////////////////////

const getGithubUser = async (access_token) => {
  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("err");
    console.log(err);
    throw 42;
  }
};

const connect_github = (req, res) => {
  res.send(
    "https://github.com/login/oauth/authorize?client_id=75e49e581966d6506fea&scope=user%20repo%20delete_repo"
  );
};

const callback_github = async (req, res) => {
  let clientID = "75e49e581966d6506fea";
  let clientSecret = "d03aa146a36fb1bbb863541aa34f6ffa5cd5fd9c";
  const rootUrl = "https://github.com/login/oauth/access_token";

  const options = {
    client_id: clientID,
    client_secret: clientSecret,
    code: req.query.code,
  };

  const queryString = qs.stringify(options);

  try {
    axios
      .post(`${rootUrl}?${queryString}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async (data) => {
        const decoded = qs.parse(data.data);
        let user = await getGithubUser(decoded.access_token);
        // console.log(user);
        let usermodel = await create_user_if_not_exist(user);
        usermodel.github_token = decoded.access_token;
        await res.cookie("access_token", generate_tokens(usermodel), {
          expires: new Date(Date.now() + 900000),
        });
        usermodel.github_username = user.login;
        console.log(user);
        await usermodel.save();
        console.log("===============LOGIN===================");
        console.log(usermodel);
        console.log("===============END=====================");
        // res.redirect("http://localhost:8081/dashboard");
        res.redirect(
          "http://localhost:8081/dashboard?access_token=" +
            generate_tokens(usermodel)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // res.send({"message": "lol"});
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

//////////////////////////////////////////////////////
///////////  GITHUB CONNECTION Mobile ///////////////
/////////////////////////////////////////////////////

const github_token = async (req, res) => {
  try {
    if (!req.body.token) {
      res.status(401).send({ message: "missing parameters" });
    }
    let user = await getGithubUser(req.body.token);
    let usermodel = await create_user_if_not_exist(user);
    usermodel.github_token = req.body.token;
    usermodel.github_username = user.login;
    await usermodel.save();
    console.log("===============LOGIN===================");
    console.log(usermodel);
    console.log("===============END=====================");
    res.send({
      message: "you're login with github",
      access_token: generate_tokens(usermodel),
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "error" });
  }
};

module.exports = {
  generate_url,
  url_callback,
  connect_github,
  callback_github,
  github_token,
};
