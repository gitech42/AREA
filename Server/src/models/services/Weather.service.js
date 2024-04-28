const { json } = require("body-parser");
var http = require("http");
const fetch = require("node-fetch");

async function get_meteo_city(user,city) {
  var APIKEY = "9d04395e689aa4cb5438f18ec5237fc0";
  res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKEY+ '&units=metric', {
    method: "GET",
    headers: {"Accept": "application/json"}
  })
.then(response => response.json())
//.then(json);
if (res == null) {
  return (get_meteo_city(user, city))
}
data = {
  description: res.weather[0].description,
  weather: res.main.temp
}
return ({data: data});
}

const all_weather_action_reaction = {
  actions: {
    "get météo": {
      functions: get_meteo_city,
      name: "get météo",
      description: "this action get the weather",
      parameter: ["timer", "text", "the city", "text"],
      is_timer:true
    },
  },
  reactions: {},
};
module.exports = {
  all_weather_action_reaction,
  get_meteo_city,
};
