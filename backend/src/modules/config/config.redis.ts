import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RedisConfig {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    //   password: process.env.REDIS_PASSWORD,
    });
  }

  getClient(): Redis {
    return this.client;
  }
}
