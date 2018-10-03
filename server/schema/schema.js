/*
schema:
1. define types
2. define relationships
3. define root queries
*/

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
//some dummy data
var books = [
  { name: "PogChamp", genre: "Sports", id: "1" },
  { name: "WutFace", genre: "Horror", id: "2" },
  { name: "PagChomp", genre: "Thriller", id: "3" }
];

// first object type
const BookType = new GraphQLObjectType({
  name: "Book",
  //needs to be a function because we are going to add different types
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

//how we enter the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // #code to get date from db / other source
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
