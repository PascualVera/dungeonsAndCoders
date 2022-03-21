import { Component, OnInit } from '@angular/core';
import { Tirada } from 'src/app/models/tirada';
import { MensajeChat } from '../../models/mensaje-chat';
import { UserService } from '../../shared/user.service';
import { PlayersService } from '../../shared/players.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';
import { MensajesChatService } from '../../shared/mensajes-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // public arrayMensajes: MensajeChat[] = [];

  constructor(public ps: PlayersService,
              public us: UserService,
              public mcs: MensajesChatService,
              private wss: WebSocketService
              ) {
    this.ps.setPlayer(this.us.user.name)
  }

  ngOnInit(): void {
    this.wss.escucha('new-message').subscribe((data: any) => {
      const { campaignCode, emisor, mensaje, fecha } = data;
      this.mcs.mensajesChat.push(new MensajeChat(campaignCode, emisor, mensaje, new Date(fecha)));
    })  
  }

  getColorEmisor(emisor: string): string {
    let color = this.ps.playerColors[this.ps.players.findIndex((usuario) => usuario == emisor)];
    return color;
  }

  nuevaFecha(fecha: Date, i: number): boolean {
    let resp: boolean = false;
    if (i > 0) {
      if (fecha.toDateString() != this.mcs.mensajesChat[i - 1].fecha.toDateString()) {
        resp = true;
      }      
    }else {
      resp = true;
    }
    return resp;
  }

  scrollAbajo(mensajes: any): string {
    mensajes.scrollTop = mensajes.scrollHeight;
    return ''
  }


  enviarMensaje(input: any, tecla?: number) {
    if ((!tecla) || (tecla == 13)) {
      let mensajeChat = {
        campaignCode: 'campañaPrueba',
        emisor: this.us.user.name,
        mensaje: input.value,
        fecha: new Date()
      }
      this.mcs.mensajesChat.push(mensajeChat);
      this.wss.emite('send-message', mensajeChat);
      input.value = '';
    }

  }

  valorAchat(tirada: Tirada, veloModalDados: any) {
    this.modalDados(veloModalDados, false);
    if (tirada.valor != 0) {
      let mensajeChat = {
        campaignCode: 'campañaPrueba',
        emisor: '[System]',
        mensaje: `Resultado tirada '${tirada.cantidad}d${tirada.caras}' para '${this.us.user.name}': ${tirada.valor}`,
        fecha: new Date()
      }
      this.mcs.mensajesChat.push(mensajeChat);
      this.wss.emite('send-message', mensajeChat);
    }
  }

  // para abrir modal
  modalDados(veloModalDados: HTMLElement, visible: boolean) {
    veloModalDados.style.display = (visible) ? 'flex' : 'none';
  }
}
