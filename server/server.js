const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const cors = require('cors')
const {json} = require('body-parser')
const http = require('http')
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


const startServer = async () => {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authMiddleware,
  });

  await server.start();

  server.applyMiddleware({ app });
  app.use(
    '/graphql',
    cors({ origin: ['https://gift-yve8.vercel.app', 'https://studio.apollographql.com'] }),
    json(),
    expressMiddleware(server),
  );
  
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};


startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,  '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
