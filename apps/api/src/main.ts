/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

import Fastify from 'fastify';
import mercurius from 'mercurius';

const fastifyApp = Fastify({ logger: true });

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
  },
};

fastifyApp.register(mercurius, {
  schema,
  resolvers,
  context: (request, reply) => {
    console.log('context test');
    return {};
  },
});

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
