import { v4 as uuid } from 'uuid';
//import { redis } from '../redis';
import * as Redis from 'ioredis';

export const confirmEmailLink = async (userId: number) => {
  const id = uuid();
  const redis = new Redis();

  await redis.set(id, userId.toString(), 'EX', 60 * 60 * 15);

  return `${process.env.BACKEND_HOST}/api/user/confirm/${id}`;
};
