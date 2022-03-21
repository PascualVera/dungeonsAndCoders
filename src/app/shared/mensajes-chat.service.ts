import { Injectable } from '@angular/core';
import { MensajeChat } from '../models/mensaje-chat';

@Injectable({
  providedIn: 'root'
})
export class MensajesChatService {

  public mensajesChat: MensajeChat[];

  constructor() {
    this.mensajesChat = [];
   }
}
