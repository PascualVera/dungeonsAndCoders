import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(public userService:UserService,private router:Router) { 
    
  }

  ngOnInit(): void {
  }
  login(identificador:any,pass:any){
    for (const user of this.userService.users){
      if((user.userName == identificador.value || user.email == identificador.value)&& user.password == pass.value){
        this.router.navigate(['/inicio'])
      }else{
        alert('buen intento crack')
      }
    }

  }

  // TODO: Provisionalpara abrir modal
  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = (visible) ? 'flex' : 'none';
  }
}
