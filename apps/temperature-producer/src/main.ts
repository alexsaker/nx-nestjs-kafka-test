/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
export const kafkaMicroServiceOption: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [
        '192.168.99.100:29092',
        '192.168.99.100:29093',
        '192.168.99.100:29094',
      ],
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.connectMicroservice(kafkaMicroServiceOption);

  const port = process.env.port || 5001;
  app.startAllMicroservicesAsync();
  console.log('Starting kafka temperature producer microservice');
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
