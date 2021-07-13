const axios = require('axios');

// All the GraphQL obejcts will go in here - any type we would like to use
// specifies whatever types of objects we would like to use
const { GraphQLObjectType, 
        GraphQLInt, 
        GraphQLString, 
        GraphQLBoolean,
        GraphQLList,
        GraphQLSchema 
      } = require('graphql');

// Obejct types: Launch Type, Rocket Type
// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});

// Root Query - end point of resolver which will resolve our data
// resolve: resolves a value for a type or field in the scehma
// when it is scalar value - end of the execution 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                // request data from 3rd party API end point - Axios or fetch()
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },
        launch : {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                // request data from 3rd party API end point - Axios or fetch()
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
        },
        rocket : {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
});

/*
GraphQL Aliases - multiple data objects to fetch

query getUsers {
  launch1: launch(flight_number: 1){
    launch_year
    launch_success
  }
  
  launch2 : launch(flight_number:2){
    launch_year
    launch_success
  }
}
*/

// export graphql schema
module.exports = new GraphQLSchema({
    query: RootQuery
});