import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public miUsuario: string;
  public arrayUsuarios: string[];
  public arrayColores: string[];
  public arrayMensajes;
  public fechaControl: Date;

  constructor() {
    this.arrayUsuarios = ['[System]', 'player1', 'player2', 'player3', 'player4', 'player5', 'player6'];
    this.miUsuario = this.arrayUsuarios[1];
    this.arrayColores = ['#8b0000', '#e7623e', '#7f513e', '#2a50a1', '#507f62', '#91a1b2', '#555752'];

    this.arrayMensajes = [
      {
        emisor: 'player3',
        mensaje: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi temporibus ipsum consequatur animi similique rerum?',
        fecha: new Date('2022-01-27')
      },
      {
        emisor: 'player2',
        mensaje: 'Lorem ipsuh gsdckjh sdfgkjh sdkfjhf gsdkfjh ksdjhgf ksjdhgf ksdjhg m dolor sit amet consectetur.',
        fecha: new Date('2022-01-27')
      },
      {
        emisor: 'player1',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, quo!',
        fecha: new Date('2022-01-27')
      },
      {
        emisor: 'player5',
        mensaje: 'Lorem, ipss dfgum dolor.',
        fecha: new Date('2022-02-16')
      },
      {
        emisor: 'player2',
        mensaje: 'Lorem ipsum dolor sit amet csfg sdfonsectetur, adipisicing elit.',
        fecha: new Date('2022-02-16')
      },
      {
        emisor: 'player6',
        mensaje: 'Lorem ipsum dolor sit ames dfgsdf gt consectetur, adipisicing elit.',
        fecha: new Date('2022-03-17')
      },
      {
        emisor: 'player2',
        mensaje: 'Lorem ipsum dolor sit ames dds fgt consectetur, adipisicing elit.',
        fecha: new Date('2022-03-17')
      },
      {
        emisor: 'player1',
        mensaje: 'Pensar que estabais más cerca de lo que creíais os hizo aprovechar los últimos rayos de sol, y el ansia por llegar os ha tenido entretenidos hasta encontraros con la isla al punto de caer la noche. Un pequeño sendero casi borrado sube por una ladera que acaba en un risco. Al borde de este, una pasarela de madera lleva a la isla encrespada, dominada por una casa de dos pisos amurallada. Al borde de la pasarela hay un cesto con frutas.',
        fecha: new Date('2022-03-17')
      },
    ]
    this.fechaControl = new Date('0000-00-00');
   }
      
   ngOnInit(): void {
  }
  
  getColorEmisor(emisor: string): string {
    let color = this.arrayColores[this.arrayUsuarios.findIndex((usuario) => usuario == emisor)];
    return color;
  }

  nuevaFecha(fecha: Date): boolean {
    let resp: boolean = false;
    console.log('*' + fecha.toDateString(), this.fechaControl.toDateString() + '*')
    if (fecha.toDateString() != this.fechaControl.toDateString()) {
      this.fechaControl = fecha;
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
        emisor: this.miUsuario,
        mensaje: input.value,
        fecha: new Date()
      }
      this.arrayMensajes.push(mensajeChat)
      input.value = '';
    }
    
    // Prueba chat dados
    let mensajeChat = {
      emisor: '[System]',
      mensaje: "Resultado tirada '1d20' para '" + this.miUsuario + "': 23",
      fecha: new Date()
    }
    this.arrayMensajes.push(mensajeChat)
    
  }

  // para abrir modal
  modalCrear(veloModalDados: HTMLElement, visible: boolean) {
    veloModalDados.style.display = (visible) ? 'flex' : 'none';
  }

  // Pendiente convertir color a numero, calcular color complementario y convertir de nuevo a color
  numToStrHex(num: number): string {
    let strHex = num.toString();
    let str = '#';
    for (var i = 0; i < strHex.length; i += 2)
      str += String.fromCharCode(parseInt(strHex.substring(i, 2), 16));
    return str;
  }

  strHexToNum(strHex: string) {
    let hex = '';
    for (var i = 0; i < strHex.length; i++) {
      hex += '' + strHex.charCodeAt(i).toString(16);
    }
    return hex;
  }
}
