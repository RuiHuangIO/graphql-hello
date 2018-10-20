const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

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
