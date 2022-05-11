const {ApolloServer, gql} = require('apollo-server');
const {typeDefs} = require('./schema');
const {Product} = require("./resolvers/Product");
const {Category} = require("./resolvers/Category");
const {Query} = require("./resolvers/Query");
const {Mutation} = require("./resolvers/Mutation");
const {db} = require("./db");
// const {categories, products, reviews} = require("./db");


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Product,
        Category,
        Query,
        Mutation
    },
    context: {
        db
    }
});

server.listen()
    .then(({url}) => {
        console.log(`Server is ready at ${url}`);
    })