/*
schema:
1. define types
2. define relationships
3. define root queries
*/

const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//some dummy data
var books = [
  { name: "PogChamp", genre: "Sports", id: "1", authorId: "3" },
  { name: "WutFace", genre: "Horror", id: "2", authorId: "1" },
  { name: "PagChomp", genre: "Thriller", id: "3", authorId: "2" },
  { name: "OMEGALUL", genre: "Comedy", id: "4", authorId: "3" },
  { name: "DansGame", genre: "Horror", id: "5", authorId: "2" },
  { name: "PogU", genre: "Sports", id: "6", authorId: "1" }
];

var authors = [
  { name: "Jason", age: "16", id: "1" },
  { name: "Jack", age: "26", id: "2" },
  { name: "John", age: "36", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  //needs to be a function because we are going to add different types
  //if they are not functions, the top to bottom approach will create a lot of undefined fields
  // using functions, they will be defined and being used when called
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //parent will be the initial book object we requested
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  //needs to be a function because we are going to add different types
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      //can't use BookType because that indicates each author only have one book
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

//how we enter the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // #code to get date from db / other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
