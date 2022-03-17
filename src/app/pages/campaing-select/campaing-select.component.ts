import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaing-select',
  templateUrl: './campaing-select.component.html',
  styleUrls: ['./campaing-select.component.css']
})
export class CampaingSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

// para abrir modal
modalCrear(veloModalCrear: HTMLElement, visible: boolean) {
  veloModalCrear.style.display = (visible) ? 'flex' : 'none';
}

}
