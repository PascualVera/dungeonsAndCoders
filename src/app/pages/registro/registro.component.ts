import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public informacion: string[];

  constructor(public userService:UserService,private router:Router) { 
    this.informacion = [
      'Las cosas han cambiado mucho en el panorama de los juegos de rol y por suerte es, cada vez más y más, una actividad accesible y popular.',
      'Sumérgete en los mundos de fantasía de Dungeons & Dragons y las aventuras de sus personajes.',
      'A través de esta plataforma podrás iniciarte en este mundo apasionante jugando en línea nuestras campañas predefinidas.',
      'No esperes más, regístrate y comienza tu aventura...'
    ]
  }

  //********//
  //Validacion//
  //********//

   validateEmail(correo:any) {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (correo.value.match(validRegex)) {
  
      alert("Valid email address!");
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      return false;
  
    }
  
  }
  //********//
  //Registro//
  //********//
  registro(nombre:any, correo:any, pass:any, passConf:any){

    if(nombre.value.length < 6){
      alert('nombre cortisimo chaval')
    }else if(pass.value.length < 8){
      alert('que haces con tu vida?')
    }else if(pass.value == passConf.value && this.validateEmail(correo)){
      let user = new User(nombre.value,correo.value, pass.value)
      this.userService.register(user).subscribe()
      this.router.navigate(['/login'])
    }else {
        alert('Contraseñas no coincidentes perro')
    }
     

  }
  ngOnInit(): void {
  }

}
