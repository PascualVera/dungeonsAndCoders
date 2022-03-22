import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket: any;
  // public server = 'http://localhost:3000/';
  public server = 'https://dnc-socket.herokuapp.com/';

  constructor() { 
    this.socket = io(this.server, {
      withCredentials: true,
      autoConnect: true
    })
  }

  escucha(nombreEvento: string) {
    return new Observable((Subscriber) => {
      this.socket.on(nombreEvento, (data: any) => {
        Subscriber.next(data)
      })
    })
  }

  emite(nombreEvento: string, data: any) {
    this.socket.emit(nombreEvento, data)
  }
}
