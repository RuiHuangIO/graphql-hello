const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const conn = require("./mongoInfo");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(conn.connectString());
mongoose.connection.once("open", () => {
  console.log("connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
    // es6 for schema schema
  })
);

app.listen(4000, () => {
  console.log("now listening on 4000");
});
