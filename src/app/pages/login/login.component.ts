import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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
   let checkUser = this.userService.users.filter((val)=>{
     if((val.email == identificador.value || val.userName ==identificador.value) && val.password == pass.value){
       return val
     }else{
       return null
     }
   })
   if(checkUser[0]== null){
     alert('usuario o contraseña incorrectas')
   }else{
     this.userService.user = checkUser[0]
     this.userService.logueado = true
     this.router.navigate(['/inicio'])
   }
  }

  // TODO: Provisionalpara abrir modal
  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = (visible) ? 'flex' : 'none';
  }
}
