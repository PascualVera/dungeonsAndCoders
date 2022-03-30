import { ERROR } from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('badreq')badreq:ElementRef
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
    //Validar Usuario
    validateUser(nombre:HTMLInputElement){
     
      let check : any= nombre.nextSibling
      let error = check.setAttribute('class','error')
      if(nombre.value == ''){
        check.setAttribute('class','check')
        return false
      }
      if(/\s/g.test(nombre.value)){
        error
        return false
      }else if(nombre.value.length < 6){
        error
        return false
      }else if(nombre.value.length > 10){
        error
        return false
      }else{
        check.setAttribute('class','valid')
        return true
      }
    }
  //Email
   validateEmail(correo:any) {
    let check:any = correo.nextSibling
    let error = check.setAttribute('class','error')
    if(correo.value == ''){
      check.setAttribute('class','check')
      return false
    }
    const validate =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if (correo.value.match(validate)) {
      check.setAttribute('class','valid')
      return true  
    } else {
      error 
      return false;
    }
  
  }
  //Contraseña
  validatePassword(password:any){
    const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    let check : any= password.nextSibling
    let error = check.setAttribute('class','error')
    if(password.value == ''){
      check.setAttribute('class','check')
      return false
    }
    if(password.value.match(validate)&&/\s/g.test(password.value) == false){ 
      check.setAttribute('class','valid')
      return true
    }else{
      error
      return false
    }
  }
  validatePassword2(password: HTMLInputElement, password2: HTMLInputElement){
    let check : any= password2.nextSibling
    if(password2.value == ''){
      check.setAttribute('class','check')
      return false
    }
    let error = check.setAttribute('class','error')
    if (password.value == password2.value ){
      check.setAttribute('class','valid')
      return true
    }
    else{
      error
      return false
    }
  }

  //********//
  //Registro//
  //********//
  registro(nombre:any, correo:any, pass:any, passConf:any){
    if( this.validateUser(nombre) && this.validatePassword(pass) && this.validateEmail(correo) && this.validatePassword2(pass,passConf) ){
      let user = new User(nombre.value,correo.value.toLowerCase(), pass.value)
      user.urlAvatar = '../../../assets/images/avatares/avatar00.png'
      this.userService.register(user).subscribe((data:any) => {
        if(data.ok){
        this.router.navigate(['/login'])
        }else{
        this.badreq.nativeElement.style.display = 'block'
        }
      }
    )
    }
  }
  ngOnInit(): void {
  }

}
