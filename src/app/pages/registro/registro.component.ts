import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public informacion: string[];

  constructor() { 
    this.informacion = [
      'Las cosas han cambiado mucho en el panorama de los juegos de rol y por suerte es cada vez más y más una actividad accesible y popular.',
      'Sumérgete en los mundos de fantasía de Dungeons & Dragons y las aventuras de sus personajes',
      'A través de esta plataforma podrás iniciarte en este mundo apasionante jugando en línea nuestras campañas predefinidas.',
      'No esperes más, regístrate y comienza tu aventura...'
    ]
  }

  ngOnInit(): void {
  }

}
