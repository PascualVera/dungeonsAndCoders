import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/shared/players.service';
import { CampaingService } from '../../shared/campaing.service';
import { UserService } from '../../shared/user.service';
import { WebSocketService } from '../../shared/web-socket.service';
import { Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from '../../../assets/fontspdf/vfs_fonts';
import { CampaignPreService } from '../../shared/campaign-pre.service';
import { CampaignPre } from 'src/app/models/campaign-pre';
import { MensajesChatService } from '../../shared/mensajes-chat.service';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {

  constructor(public router:Router,
              private ps: PlayersService,
              private userService: UserService,
              private wss: WebSocketService,
              public campaignService: CampaingService,
              private campaignPreServices: CampaignPreService,
              private mcs: MensajesChatService
              ) { 
  }

  ngOnInit(): void {
  }

  modal(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';    
  }
  copyCode(confirm:HTMLElement){
    confirm.innerHTML = 'Copiado'
    navigator.clipboard.writeText(this.campaignService.actualCampaign.idCampaign)
    setTimeout(()=>{
      confirm.innerHTML = 'Copiar Código'
    },1000)
  }

  startCampaign(veloModal: HTMLElement) {
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
      .subscribe((resp: any) =>{
        this.campaignService.actualCampaign.playerMin = resp.resultado[0].playerMin;
        this.campaignService.actualCampaign.numPlayer = resp.resultado[0].numPlayer;
        if (resp.resultado[0].numPlayer >= resp.resultado[0].playerMin){
          let campaign = {
            closed: 1,
            idCampaign: this.campaignService.actualCampaign.idCampaign
          }
          this.campaignService.putCampaing(campaign)
            .subscribe(() =>{
              this.campaignService.actualCampaign.closed = 1;
            })
        } else {
          this.modal(veloModal, true);
        }
      })
  }

  endCampaign() {
    this.campaignService.deleteCampaign(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any)=>{
      if (resp.ok) {
        this.wss.emite('send-finalizar', { campaignCode: this.campaignService.actualCampaign.idCampaign });
        this.router.navigate(['/perfil'])
      }
    })
  }

  leaveCampaign() {
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
      .subscribe((resp: any) => {
        if (resp.ok) {
          let numPlayer = { numPlayer: resp.resultado[0].numPlayer - 1, idCampaign: this.campaignService.actualCampaign.idCampaign }
          this.campaignService.putCampaing(numPlayer).subscribe(() => { 
          })
          this.ps.deletePlayer(this.userService.user.idUser, this.campaignService.actualCampaign.idCampaign)
            .subscribe(() => {
              let masmenosPlayer = {
                campaignCode: this.campaignService.actualCampaign.idCampaign,
                player: this.userService.user.name,
                viene: false
              }
              this.wss.emite('send-masmenosplayer', masmenosPlayer);
              this.router.navigate(['/perfil'])
             });
        }
      })
  }

  guardarHistorial() {
    this.campaignPreServices.getCampaignPreById(this.campaignService.actualCampaign.idCampaignPre)
    .subscribe((resp: any) => {
      if (resp.ok) {
        this.campaignPreServices.actualCampaignPre = new CampaignPre();
        this.campaignPreServices.actualCampaignPre = resp.resultado[0];
        this.crearPdf();
      }else {
        console.log(resp.message);
      }
    })
  }


  async crearPdf() {
    const { campaignName, synopsis } = this.campaignPreServices.actualCampaignPre;
        
    PdfMakeWrapper.setFonts(pdfFonts, {
      dwarf: {
        normal: "DwarvenAxe.ttf",
        bold: "DwarvenAxe.ttf",
        italics: "DwarvenAxe.ttf",
        bolditalics: "DwarvenAxe.ttf"
      },
      fable: {
        normal: "Fable_W01_Smooth.ttf",
        bold: "Fable_W01_Smooth.ttf",
        italics: "Fable_W01_Smooth.ttf",
        bolditalics: "Fable_W01_Smooth.ttf"
      },      
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Bold.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-BoldItalic.ttf"
      }
    });
    
    const historial = new PdfMakeWrapper();
    const bg = await new Img("../../../assets/images/pergaminepdf.png").build();
    
    // Backgroung
    historial.background(bg);
    // Formato página
    historial.pageSize('A4');
    // historial.pageMargins(70);
    
    // Contenido
    const logo = await new Img("../../../assets/images/dcLogoHeader.png").width(250).alignment('center').build();
    historial.add(logo);
    let texto = new Txt(campaignName).alignment('center').fontSize(36).font('dwarf').margin([0,10,0,0]).end;
    historial.add(texto);
    
    texto = new Txt(synopsis).alignment('justify').margin([10, 20]).font('fable').fontSize(16).end;
    historial.add(texto);


    let players = '';
    this.ps.players.forEach((item, indice) => {
      if (indice > 0){
        players += ' - '
      };
      players += item.name
    })

    let tabla = new Table([
      [
        new Txt('CAMPAÑA').bold().end,
        this.campaignService.actualCampaign.campaignName
      ],
      [
        new Txt('MASTER').bold().end,
        this.userService.user.name
      ],
      [
        new Txt('JUGADORES').bold().end,
        players
      ]
    ]).layout('noBorders').widths([80, '*']).margin([10, 0, 0, 0]).end;

    historial.add(tabla);

    texto = new Txt('HISTORIAL DEL CHAT').alignment('center').fontSize(24).font('dwarf').margin([0, 20, 0, 0]).pageBreak('before').end;
    historial.add(texto);

    let mensajes = this.mcs.mensajesChat.map((item) => {
      const { emisor, mensaje, fecha } = item;
      let fechaString = ((fecha.getDate() < 10) ? '0' : '') + fecha.getDate().toString();
      fechaString += '-' + ((fecha.getMonth() < 9) ? '0' : '') + (fecha.getMonth() + 1).toString();
      fechaString += '-' + fecha.getFullYear().toString();

      return [
        new Txt(emisor).fontSize(8).end,
        new Txt(mensaje).fontSize(8).end,
        new Txt(fechaString).fontSize(8).end
      ]
    });

    tabla = new Table([
      [
        new Txt('Usuario').bold().end,
        new Txt('Mensaje').bold().end,
        new Txt('Fecha').bold().end
      ],
      ...mensajes
    ]).widths(['*', 300, '*']).end;

    historial.add(tabla);

    // Descargar
    historial.create().open();
    // historial.create().download(this.campaignService.actualCampaign.campaignName +  '.pdf');

  }

}
