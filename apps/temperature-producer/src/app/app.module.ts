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
          client: {
            clientId: 'location',
            brokers: [
              '192.168.99.100:29092',
              '192.168.99.100:29093',
              '192.168.99.100:29094',
            ],
          },
          producer: {
            allowAutoTopicCreation: true,
          },
          // consumer: {
          //   allowAutoTopicCreation: true,
          //   groupId: 'location-consumer'
          // }
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
