const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();

/* 
    Express usually creates different route But with express, graphql we only have one end point '/graphql' 
    from there we create Schema File including all the query files, the action we want to perform
*/ 
app.use('/graphql', graphqlHTTP({
    schema,
    // graphql: Enable client to make query into server
    graphiql: true
}));

const PORT = proess.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));