import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: Provisionalpara abrir modal
  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = (visible) ? 'flex' : 'none';
  }
}
