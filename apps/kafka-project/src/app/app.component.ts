import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nx-nestjs-kafka-project/api-interfaces';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nx-nestjs-kafka-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  socketEvent$ = this.socket.fromEvent('events').pipe(map((data) => data));
  constructor(private http: HttpClient, private socket: Socket) {}
}
