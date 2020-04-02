import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  wsClients = [];

  @WebSocketServer()
  server: Server;
  afterInit() {
    this.server.emit('testing', { do: 'stuff' });
  }

  getWebSocketServer(): Server {
    return this.server;
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    this.wsClients = this.wsClients.filter((el) => el.client.id !== client.id);
    this.broadcast('disconnect', {});
  }
  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.wsClients) {
      c.send(event, broadCastMessage);
    }
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item }))
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: string): Promise<string> {
    return data;
  }
}
