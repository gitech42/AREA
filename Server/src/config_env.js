// Server path
const { mongoose } = require("mongoose");

const url =
  "mongodb+srv://area:QK8vOfNge4N36IYv@cluster0.exv7erb.mongodb.net/?retryWrites=true&w=majority";

let client = undefined;

client = new mongoose.connect(url, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
// mongoose.connect(url,   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
// )
//     .then(() => console.log('Now connected to MongoDB!'))
//     .catch(err => console.error('Something went wrong', err));

console.log("mongoose readyState is " + mongoose.connection.readyState);

module.exports = {
  secret: "45108410208520",
  refresh_token_code: "741028521",
  google_client_id:
    "628498484335-sl06q2au17b1522j8bo7lhusf3caq0dl.apps.googleusercontent.com",
  google_client_secret: "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",
  google_oauth_redirection: "http://localhost:8080/api/auth/oauth",
  client: client,
};
