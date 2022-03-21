import { Component, OnInit } from '@angular/core';
import { CampaingService } from 'src/app/shared/campaing.service';


@Component({
  selector: 'app-vista-master',
  templateUrl: './vista-master.component.html',
  styleUrls: ['./vista-master.component.css']
})
export class VistaMasterComponent implements OnInit {
 
  constructor(public campaingService:CampaingService) { }

  ngOnInit(): void {
  }

  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
  }

  modalPersonaje(modalPersonaje: HTMLElement, visible: boolean) {
    modalPersonaje.style.display = (visible) ? 'flex' : 'none';
  }
}
