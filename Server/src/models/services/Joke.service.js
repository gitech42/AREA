const fetch = require("node-fetch");
let global = "";


const all_joke_action_reaction = {
  actions: {
    "generate joke": {
      functions: call_joke_api,
      description: "this reaction send basic Joke",
      name: "generate joke",
      parameter: ["timer", "text"],
      is_timer: true,
    },
    "generate guess joke": {
      functions: call_joke_api_guess,
      description: "this reaction send guess joke",
      name: "generate guess joke",
      parameter: ["timer", "text"],
      is_timer: true,
    },
  },
  reactions: {},
};

async function call_joke_api(user) {
  const options = {
    headers: {
      Accept: "text/plain",
    },
  };
  res = await fetch('https://icanhazdadjoke.com/', {
  method: "GET",
  headers: {"Accept": "application/json"}
})
.then(response => response.json()) 
.then(json => (json.joke)); 
if (res == null) {
  return (call_joke_api(user))
}
return ({
  data: res,
});
//.catch(err => console.log(err));
}

async function call_joke_api_guess(user) {
    res = await fetch('https://icanhazdadjoke.com/slack', {
  method: "GET",
  headers: {"Accept": "application/json"}
})
.then(response => response.json()) 
.then(json => (json.attachments[0].fallback)); 
if (res == null) {
  return (call_joke_api_guess(user))
}
return ({
  data: res,
});
}

//async function call_test() {
//  let test = await call_joke_api_guess();
//  console.log(test);
//}


module.exports = {
  call_joke_api,
  call_joke_api_guess,
  all_joke_action_reaction,
};
