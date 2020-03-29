import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          subscribe: { fromBeginning: true },
          client: {
            clientId: 'api',
            brokers: [
              '192.168.99.100:29092',
              '192.168.99.100:29093',
              '192.168.99.100:29094',
            ],
          },
          consumer: {
            allowAutoTopicCreation: true,
            readUncommitted: true,
            heartbeatInterval: 10,
            groupId: 'location-consumer-api',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
