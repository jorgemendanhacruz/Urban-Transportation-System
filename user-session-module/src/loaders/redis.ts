import { createClient } from 'redis';
import config from '../config/config'

const client = createClient({
  username: config.redis.username,
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: config.redis.port
  }
});

export default async function loadRedis() {
  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();
  return client;
}
