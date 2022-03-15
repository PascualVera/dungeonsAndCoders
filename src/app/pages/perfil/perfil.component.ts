import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Provisional para alternar  true false entre elección de detalles y campañas
  public detalles: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
