import path from 'path'
import resolvers from './schemas/resolvers.js'
import typeDefs from './schemas/typeDefs.js'
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(cors());
app.use(json());

server.applyMiddleware({ app, path: '/graphql' });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

await server.listen({ port: 4000 });
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});