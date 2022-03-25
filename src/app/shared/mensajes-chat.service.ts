import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeChat } from '../models/mensaje-chat';

@Injectable({
  providedIn: 'root'
})
export class MensajesChatService {

  public mensajesChat: MensajeChat[];
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    // this.url = 'http://localhost:4000'
    this.mensajesChat = [];
  }

  getCampaignMessages(idCampaign: string) {
    return this.http.get(this.url + `/chat?idCampaign=${idCampaign}` )
  }

  postChatMessage(mensaje: MensajeChat) {
    return this.http.post(this.url + '/chat', mensaje )
  }
}
