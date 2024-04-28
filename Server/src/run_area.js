const { Areas } = require("./models/Areas.models");
const { Reactions } = require("./models/Reaction.models");
const { Actions } = require("./models/Actions.models");
const { Services } = require("./models/Service.models");
const { Users } = require("./models/User.models");
const { all_joke_action_reaction } = require("./models/services/Joke.service");
const {
  all_gmail_action_reaction,
} = require("./models/services/Gmail.service");
const {
  all_weather_action_reaction,
} = require("./models/services/Weather.service");
const {
  all_crypto_action_reaction,
} = require("./models/services/CoinCap.service");
const {
  all_calendar_action_reaction,
} = require("./models/services/GoogleCalendar.service");
const {
  all_pokemon_action_reaction,
} = require("./models/services/Pokemon.service");
const {
  all_pornhub_action_reaction,
} = require("./models/services/Pornhub.service");
const {
  all_youtube_action_reaction,
} = require("./models/services/Youtube.service");
const {
  all_github_action_reaction,
} = require("./models/services/Github.service");
const { json } = require("body-parser");

const pointer_to_function = {
  Pokemon: Pokemon_func,
  Coincap: Coincap_func,
  Youtube: Youtube_func,
  Joke: Joke_func,
  Google: Google_func,
  Pornhub: Pornhub_func,
  Weather: Weather_func,
  Gmail: Gmail_func,
  "Google Calendar": Google_Calendar_func,
  Github: Github_func,
};
const all_result_by_area = {};

////////////////////////////////////////////////////////////////////////////////:
////////////////////// FOr Joke Service ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

async function run_timer(reaction, action, user, area, all_reaction_action) {
  let area2 = await Areas.findOne({ _id: area._id });
  let service = await Services.findOne({ _id: reaction.service });

  if (area2 === null) {
    return;
  }
  console.log(service);
  await pointer_to_function[service.name](
    action,
    reaction,
    user,
    await all_reaction_action.actions[action.name].functions(user),
    false,
    area
  );
}

async function Joke_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  let key = user.email + action.name + reaction.name;

  if (is_action) {
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      console.log("enter setinterval");
      setInterval(async () => {
        run_timer(reaction, action, user, area, all_joke_action_reaction);
      }, parseInt(area.param_action[0]));
      all_result_by_area[key] = "";
      //setInterval(async () => { run_timer(reaction, action, user, area, all_joke_action_reaction)}, parseInt(area.param_action[0]));
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Youtube Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
async function Youtube_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  let ret = {};
  if (is_action) {
    let res = await all_youtube_action_reaction.actions[action.name].functions(
      user,
      area.param_action[0],
      last_result["data"]
    );
    res["check"] = Object.keys(last_result).length === 0 ? false : res["check"];
    //console.log(all_joke_action_reaction.actions[action.name].functions());
    return res;
  } else {
    if (area.param_action.length == 1) {
      return JSON.stringify(
        await all_youtube_action_reaction.reactions[reaction.name].functions(
          user,
          area.param_action[0],
          ""
        )
      );
    } else {
      console.log(area.param_action);
      return JSON.stringify(
        await all_youtube_action_reaction.reactions[reaction.name].functions(
          user,
          area.param_reaction[0],
          area.param_reaction[1]
        )
      );
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Google Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function Google_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Pornhub Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
async function Pornhub_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  console.log("pornhub func")
  if (is_action) {
    let key = user.email + action.name + reaction.name;
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      console.log("enter setinterval");
      all_result_by_area[key] = "";
      setInterval(async () => {
        await run_timer(reaction, action, user, area, all_pornhub_action_reaction);
      }, parseInt(area.param_action[0]));
    }
    //console.log(all_joke_action_reaction.actions[action.name].functions());
    return;
  } else {
    return JSON.stringify(
      await all_pornhub_action_reaction.reactions[reaction.name].functions(
        user,
        area.param_action[0]
      )
    );
  }
}

async function Coincap_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  if (is_action) {
    let key = user.email + action.name + reaction.name;
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      console.log("enter setinterval");
      all_result_by_area[key] = "";
      setInterval(async () => {
        run_timer(reaction, action, user, area, all_crypto_action_reaction);
      }, parseInt(area.param_action[0]));
    }
  } else {
    return JSON.stringify(
      await all_crypto_action_reaction.reactions[reaction.name].functions(
        user,
        area.param_action[0]
      )
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Weather Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
async function Weather_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  if (is_action) {
    let key = user.email + action.name + reaction.name;
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      console.log("enter setinterval");
      all_result_by_area[key] = "";
      setInterval(async () => {
        run_timer(reaction, action, user, area, all_weather_action_reaction);
      }, parseInt(area.param_action[0]));
    }
    return res;
  } else {
    return JSON.stringify(
      await all_weather_action_reaction.reactions[reaction.name].functions(
        user,
        area.param_action[0]
      )
    );
  }

  return "";
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Github Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param last_result last of this action
 * @param area
 * @returns {Promise<*>}
 */
async function run_checker_action(user, action, last_result, area) {
  let res = await all_github_action_reaction.actions[action.name].functions(
    user,
    area.param_action[0],
    last_result["data"]
  );
  res["data"] = JSON.stringify(res["data"]);
  res["check"] = Object.keys(last_result).length === 0 ? false : res["check"];
  return res;
}

/**
 *
 * @returns {Promise<*>}
 */
async function run_action(user, action, last_result, area) {
  if (all_github_action_reaction.actions[action.name].is_checker) {
    return await run_checker_action(user, action, last_result, area);
  } else if (all_github_action_reaction.actions[action.name].is_timer) {
    let key = user.email + action.name + reaction.name;
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      console.log("enter setinterval");
      all_result_by_area[key] = "";
      setInterval(async () => {
        run_timer(reaction, action, user, area, all_github_action_reaction);
      }, parseInt(area.param_action[0]));
    }
  } else {
    return await all_github_action_reaction.actions[action.name].functions(
      user,
      area.param_action[0]
    );
  }
}

/**
 *
 * run Github action reaction main function
 * @param action
 * @param reaction
 * @param user
 * @param last_result
 * @param is_action
 * @param area
 * @returns {Promise<string|*>}
 * @constructor
 */
async function Github_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  let ret = {};
  if (is_action) {
    return await run_action(user, action, last_result, area);
  } else {
    return JSON.stringify(
      await all_github_action_reaction.reactions[reaction.name].functions(
        user,
        area.param_reaction[0] == "" ? "" : area.param_reaction[0],
        area.param_reaction[1] == "" ? "" : area.param_reaction[1],
        area.param_reaction[2] == "" ? "" : area.param_reaction[2],
        area.param_reaction[3] == "" ? "" : area.param_reaction[3],
        area.param_reaction[4] == "" ? "" : area.param_reaction[4]
      )
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Gmail Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
async function Gmail_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  if (is_action) {
    return await all_gmail_action_reaction.actions[action.name].functions();
  } else {
    return await all_gmail_action_reaction.reactions[reaction.name].functions(
      user,
      area.param_reaction[0] == "" ? user.email : area.param_reaction[0],
      last_result["data"],
      action.name
    );
  }

  return "";
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Calendar Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function day_of_the_month(d) {
  return (d < 10 ? "0" : "") + d;
}

async function Google_Calendar_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  if (is_action) {
    return await all_calendar_action_reaction.actions[action.name].functions();
  } else {
    let date = new Date(area.param_reaction[0]);
    date =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      day_of_the_month(date.getDate()) +
      "T" +
      day_of_the_month(date.getHours()) +
      ":" +
      day_of_the_month(date.getMinutes()) +
      ":" +
      day_of_the_month(date.getSeconds()) +
      "-07:00";
    let date2 = new Date(area.param_reaction[1]);
    date2 =
      date2.getFullYear() +
      "-" +
      date2.getMonth() +
      "-" +
      day_of_the_month(date2.getDate()) +
      "T" +
      day_of_the_month(date2.getHours()) +
      ":" +
      day_of_the_month(date2.getMinutes()) +
      ":" +
      day_of_the_month(date2.getSeconds()) +
      "-07:00";
    return await all_calendar_action_reaction.reactions[
      reaction.name
    ].functions(
      user,
      date,
      date2,
      area.param_reaction[2],
      area.param_reaction[3]
    );
  }
}

async function Pokemon_func(
  action,
  reaction,
  user,
  last_result = {},
  is_action = true,
  area = {}
) {
  if (is_action) {
    let key = user.email + action.name + reaction.name;
    if (key in all_result_by_area) {
      console.log("key already in use");
    } else {
      all_result_by_area[key] = "";
      setInterval(async () => {
        run_timer(reaction, action, user, area, all_pokemon_action_reaction);
      }, parseInt(area.param_action[0]));
    }
  } else {
    return JSON.stringify(
      await all_pokemon_action_reaction.reactions[reaction.name].functions(
        user,
        area.param_action[0]
      )
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
////////////////////// For Gmail Service /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

async function run_script() {
  while (1) {
    let areas = await Areas.find({});

    for (const area of areas) {
      if (!area.active) continue;
      let reaction = await Reactions.findOne({ _id: area.reaction });
      let action = await Actions.findOne({ _id: area.action });
      let Service_action = await Services.findOne({ _id: action.service });
      let Service_reaction = await Services.findOne({ _id: reaction.service });
      let user = await Users.findOne({ email: area.user });
      let key = user.email + action.name + reaction.name;
      try {
        if (key in all_result_by_area) {
          all_result_by_area[key] = await pointer_to_function[
            Service_action.name
          ](action, reaction, user, all_result_by_area[key], true, area);
        } else {
          all_result_by_area[key] = await pointer_to_function[
            Service_action.name
          ](action, reaction, user, {}, true, area);
        }
        if (
          Service_action.name === "Youtube" &&
          all_youtube_action_reaction.actions[action.name].is_checker &&
          all_result_by_area[key]["check"]
        ) {
          await pointer_to_function[Service_reaction.name](
            action,
            reaction,
            user,
            all_result_by_area[key],
            false,
            area
          );
        } else if (
          Service_action.name === "Youtube" &&
          all_youtube_action_reaction.actions[action.name].is_checker &&
          !all_result_by_area[key]["check"]
        ) {
        } else if (
          Service_action.name === "Github" &&
          all_github_action_reaction.actions[action.name].is_checker &&
          all_result_by_area[key]["check"]
        ) {
          await pointer_to_function[Service_reaction.name](
            action,
            reaction,
            user,
            all_result_by_area[key],
            false,
            area
          );
        } else if (
          Service_action.name === "Github" &&
          all_github_action_reaction.actions[action.name].is_checker &&
          !all_result_by_area[key]["check"]
        ) {
        } else if (Service_action.name == "Joke") {
        } else if (Service_action.name == "Pornhub") {
        } else {
          await pointer_to_function[Service_reaction.name](
            action,
            reaction,
            user,
            all_result_by_area[key],
            false,
            area
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

module.exports = {
  run_script,
};
