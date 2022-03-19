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
  //Email
   validateEmail(correo:any) {

    const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (correo.value.match(validate)) {
      return true  
    } else {
      alert("Invalid email address!");
      return false;
    }
  
  }
  //Contraseña
  validatePassword(password:any){
    const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if(password.value.match(validate)&&/\s/g.test(password.value) == false){ 
      return true
    }else{
      alert('contraseña invalida')
      return false
    }
  }
  validatePassword2(password: HTMLInputElement, password2: HTMLInputElement){
    if (password.value == password2.value ){
      return true
    }
    else{
      alert('no coincide perro')
      return false
    }
  }
  //Validar Usuario
  validateUser(nombre:HTMLInputElement){
    
    if(/\s/g.test(nombre.value)){
      alert('No spaces')
      return false

    }else if(nombre.value.length < 6){
      alert('nombre muy corto')
      return false
    }else{
      return true
    }
  }
  //********//
  //Registro//
  //********//
  registro(nombre:any, correo:any, pass:any, passConf:any){
    if( this.validateUser(nombre) && this.validatePassword(pass) && this.validateEmail(correo) && this.validatePassword2(pass,passConf) ){
      let user = new User(nombre.value,correo.value, pass.value)
      this.userService.register(user).subscribe()
      this.router.navigate(['/login'])
      console.log(user)
    }
  }
  ngOnInit(): void {
  }

}
