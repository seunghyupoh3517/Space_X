const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const app = express();

// Allow cross-origin - cors between different ports
app.use(cors());

/* 
    Express usually creates different route But with express, graphql we only have one end point '/graphql' 
    from there we create Schema File including all the query files, the action we want to perform
*/ 
app.use(
    '/graphql', 
    graphqlHTTP({
    schema,
    // graphql: Enable client to make query into server
    graphiql: true // graphiql in-browser tool to test graphql query - should disable for the production level
    })
);

// setting to environment variable so to use when deploy Haroku, we can read it
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));