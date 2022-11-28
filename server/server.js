// // const express = require('express');
// const {ApolloServer} = require('apollo-server-express');
// const path = require('path');

// const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();

// const httpServer = http.createServer(app);

// const startServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     context: authMiddleware,
//   });
//   await server.start();
//   server.applyMiddleware({ app });
//   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// };

// app.use(
//   '/graphql',
//   cors({ origin: ['https://gift-yve8.vercel.app/login', 'https://studio.apollographql.com'] }),
//   json(),
//   expressMiddleware(server),
// );

// startServer()

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// //Serve up static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// });

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import { typeDefs, resolvers } from './schema';
import cors from 'cors';

const app = express();
const startServer = async() =>{
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: authMiddleware
});

await server.start();
server.applyMiddleware({app});

};

startServer()

app.use(
  '/graphql',
  cors({ origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }),
  json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);