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
  secret: "can't expose",
  refresh_token_code: "can't expose",
  google_client_id:
    "can't expose",
  google_client_secret: "can't expose",
  google_oauth_redirection: "http://localhost:8080/api/auth/oauth",
  client: client,
};
