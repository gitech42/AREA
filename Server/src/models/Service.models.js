const mongoose = require("mongoose");
const { Reactions } = require("./Reaction.models");
const { all_gmail_action_reaction } = require("./services/Gmail.service");
const { Actions } = require("./Actions.models");
const { all_weather_action_reaction } = require("./services/Weather.service");
const { all_joke_action_reaction } = require("./services/Joke.service");
const { all_pokemon_action_reaction } = require("./services/Pokemon.service");
const { all_github_action_reaction } = require("./services/Github.service");
const { Users } = require("./User.models");
const { github_token } = require("../controllers/OAuth.controller");
const {
  all_calendar_action_reaction,
} = require("./services/GoogleCalendar.service");
const { all_youtube_action_reaction } = require("./services/Youtube.service");
const { all_crypto_action_reaction } = require("./services/CoinCap.service");
const { all_pornhub_action_reaction } = require("./services/Pornhub.service");
const Ip = require("ip");
const { add } = require("nodemon/lib/rules");
const Schema = mongoose.Schema;

const msg_already_saved = (name) => {
  console.log(name + " service is already saved or error during the save");
};

const ServiceModels = new Schema({
  name: { type: String, require: true, unique: true },
  file: { type: String, require: true, unique: true },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reactions",
    },
  ],
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Actions",
    },
  ],
});

async function insert_action(service, all_action) {
  for (const action in all_action) {
    console.log(
      "create : " + all_action[action].name + " in " + service.name + "service"
    );

    let new_action = await Actions.create({
      name: all_action[action].name,
      description: all_action[action].description,
      service: service,
      param: all_action[action].parameter,
    });

    await Services.updateMany(
      { _id: service },
      { $push: { actions: new_action._id } }
    );
  }
}

async function insert_reaction(services, all_reaction) {
  for (const reaction in all_reaction) {
    console.log(
      "create : " +
        all_reaction[reaction].name +
        " in " +
        services.name +
        "service"
    );

    let new_reaction = await Reactions.create({
      name: all_reaction[reaction].name,
      description: all_reaction[reaction].description,
      service: services,
      param: all_reaction[reaction].parameter,
    });

    await Services.updateMany(
      { _id: services },
      { $push: { reactions: new_reaction._id } }
    );
  }
}

let Services = mongoose.model("Service", ServiceModels);
let address = Ip.address();
let weather = new Services({
  name: "Weather",
  file: "weather.png",
});
let gmail = new Services({
  name: "Gmail",
  file: "gmail.png",
});
let joke = new Services({
  name: "Joke",
  file: "joke.png",
});
let pokemon = new Services({
  name: "Pokemon",
  file: "pokemon.png",
});
let github = new Services({
  name: "Github",
  file: "github.png",
});

let google_calendar = new Services({
  name: "Google Calendar",
  file: "google_calendar.png",
});

let youtube = new Services({
  name: "Youtube",
  file: "youtube.png",
});

let pornhub = new Services({
  name: "Pornhub",
  file: "pornhub.png",
});

let coincap = new Services({
  name: "Coincap",
  file: "coincap.png",
});

/**
 * @description this function create a service if is not in se database
 */
function check_and_update_service() {
  /**
   *  Insert Gmail service into database
   */

  gmail
    .save()
    .then(async (res) => {
      await insert_action(gmail, all_gmail_action_reaction.actions);
      await insert_reaction(gmail, all_gmail_action_reaction.reactions);
      console.log(gmail.name + " service it's saved");
    })
    .catch((err) => {
      msg_already_saved(gmail.name);
    });

  /**
   *  Insert Weather service into database
   */
  weather
    .save()
    .then(async (res) => {
      await insert_action(weather, all_weather_action_reaction.actions);
      await insert_reaction(weather, all_weather_action_reaction.reactions);
      console.log(weather.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(weather.name);
    });
  joke
    .save()
    .then(async (res) => {
      await insert_action(joke, all_joke_action_reaction.actions);
      await insert_reaction(joke, all_joke_action_reaction.reactions);
      console.log(joke.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(joke.name);
    });
  pokemon
    .save()
    .then(async (res) => {
      await insert_action(pokemon, all_pokemon_action_reaction.actions);
      await insert_reaction(pokemon, all_pokemon_action_reaction.reactions);
      console.log(pokemon.name + "pokemon service it's saved");
    })
    .catch(() => {
      msg_already_saved(pokemon.name);
    });
  github
    .save()
    .then(async (res) => {
      await insert_action(github, all_github_action_reaction.actions);
      await insert_reaction(github, all_github_action_reaction.reactions);
      console.log(github.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(github.name);
    });
  google_calendar
    .save()
    .then(async (res) => {
      await insert_action(
        google_calendar,
        all_calendar_action_reaction.actions
      );
      await insert_reaction(
        google_calendar,
        all_calendar_action_reaction.reactions
      );
      console.log(google_calendar.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(google_calendar.name);
    });
  youtube
    .save()
    .then(async (res) => {
      await insert_action(youtube, all_youtube_action_reaction.actions);
      await insert_reaction(youtube, all_youtube_action_reaction.reactions);
      console.log(youtube.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(youtube.name);
    });
  pornhub
    .save()
    .then(async (res) => {
      await insert_action(pornhub, all_pornhub_action_reaction.actions);
      await insert_reaction(pornhub, all_pornhub_action_reaction.reactions);
      console.log(pornhub.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(pornhub.name);
    });
  coincap
    .save()
    .then(async (res) => {
      await insert_action(coincap, all_crypto_action_reaction.actions);
      await insert_reaction(coincap, all_crypto_action_reaction.reactions);
      console.log(coincap.name + " service it's saved");
    })
    .catch(() => {
      msg_already_saved(coincap.name);
    });
}

module.exports = {
  gmail,
  weather,
  github,
  pornhub,
  create_service: check_and_update_service,
  Services,
};
