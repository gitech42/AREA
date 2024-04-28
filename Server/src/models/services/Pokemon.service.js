const https = require("https");

const all_pokemon_action_reaction = {
  actions: {
    "generate pokemons's stats": {
      functions: call_pokemon_api,
      description: "this reaction send statistic about specific pokemon",
      name: "generate pokemons's stats",
      parameter: [
        "timer",
        "text",
        "name of pokemon",
        "text"
      ],
      is_timer: true,
    },
  },
  reactions: {},
};

function call_pokemon_api(user, name) {
  https.get("https://pokeapi.co/api/v2/pokemon/" + name, (response) => {
    var hp = "";
    var result = "";
    response.on("data", function (chunk) {
      result += chunk;
    });

    response.on("end", function () {
      all_occurence_types = findAllOccurrences(result, "types");
      all_occurence_stats = findAllOccurrences(result, "base_stat");
      find_type = result.substring(
        all_occurence_types[1],
        result.lastIndexOf("url")
      );
      all_occurence_url = findAllOccurrences(find_type, "url");
      hp = result.substring(
        all_occurence_stats[0] + 10,
        all_occurence_stats[0] + 13
      );
      attack = result.substring(
        all_occurence_stats[1] + 10,
        all_occurence_stats[1] + 13
      );
      defense = result.substring(
        all_occurence_stats[2] + 10,
        all_occurence_stats[2] + 13
      );
      super_attack = result.substring(
        all_occurence_stats[3] + 10,
        all_occurence_stats[3] + 13
      );
      type = find_type.substring(27, all_occurence_url[0]);
      weight = result.substring(result.indexOf("weight") + "weight".length);
      data = "health point: " +
      hp +
        "\n" + "attack point: "+
        attack +
        "\n" + "defense point: "+
        defense +
        "\n" + "super attack point: " +
        super_attack +
        "\n" + "type of pokemon: "+
        type +
        "\n" + "weight of pokemon: "+
        weight;
      return({
        data:data
      });
    });
  });
}

const findAllOccurrences = (str, substr) => {
  str = str.toLowerCase();
  let result = [];
  let idx = str.indexOf(substr);
  while (idx !== -1) {
    result.push(idx);
    idx = str.indexOf(substr, idx + 1);
  }
  return result;
};

module.exports = {
  call_pokemon_api,
  all_pokemon_action_reaction,
};
