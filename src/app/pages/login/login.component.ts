
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
  // TODO: Provisionalpara abrir modal
  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = (visible) ? 'flex' : 'none';
  }
  checkPassword(password:HTMLInputElement,verificacion:HTMLElement){
    password.setAttribute('class','error')
    verificacion.setAttribute('class','check_err')
  }
  login(identificador:any,pass:any,validate:HTMLElement){
    
    let user = {
      nameEmail : identificador.value,
      password: pass.value
    }
  this.userService.login(user).subscribe((data:any)=>{
       if(data.ok){
       this.router.navigate(['/inicio'])
       this.userService.user = data
      }else{
        this.checkPassword(pass,validate)
      }
    }
  )
      
       
     }

  ngOnInit(): void {
  }

  }

  

