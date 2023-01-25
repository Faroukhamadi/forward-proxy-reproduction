import fastify from 'fastify';
import { fetch } from 'undici';

const server = fastify();

// fetch ipinfo.io external API using undici
server.get('/ipinfo', async (request, reply) => {
  const response = await fetch('https://ipinfo.io/json');
  const json = await response.json();
  reply.code(200);
  reply.header('Content-Type', 'application/json; charset=utf-8');
  reply.send(json);
});

// fetch a page that has html that tells us 'Unsupported Region'
server.get('/crackle', async (request, reply) => {
  const response = await fetch('https://www.sling.com/');

  const html = await response.text();
  reply.code(200);
  reply.header('Content-Type', 'text/html; charset=utf-8');
  reply.send(html);
});

server.listen(
  {
    port: 4000,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
