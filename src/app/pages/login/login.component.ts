import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  modalPass(veloModalPass: HTMLElement, visible: boolean, mail?: HTMLInputElement, verify?: HTMLElement) {
    veloModalPass.style.display = visible ? 'flex' : 'none';
    if (mail) {
      mail.value = '';
      verify.style.visibility = 'hidden';      
    }
  }

  login(identificador: any, pass: any, validate: HTMLElement, tecla?: number) {
    identificador.setAttribute('class', '');
    pass.setAttribute('class', '');
    validate.setAttribute('class', 'validate');
    if ((!tecla) || (tecla == 13)) {
      let user = {
        nameEmail: identificador.value,
        password: pass.value,
      };
      this.userService.login(user).subscribe((data: any) => {
        if (data.ok) {
          this.userService.user = data.resultado;
          this.save(this.userService.user)
          this.router.navigate(['/inicio']);
        } else {
          identificador.setAttribute('class', 'error');
          pass.setAttribute('class', 'error');
          validate.setAttribute('class', 'check_err');
        }
      });
    }
  }

  recuperarPass(mail: HTMLInputElement, verify: HTMLElement) {
    verify.style.visibility = 'visible';
    this.userService.getUsers()
      .subscribe((resp: any) => {
        if (resp.ok) {
          let usuario = resp.resultado.find(usuario => usuario.email == mail.value)
          if (usuario) {
            let mailObj = { email: mail.value };
            let addTempPass = {
              idUser: usuario.idUser,
              passTemp: '',
              passTimeOut: '',
            };
            this.userService.recuperarPass(mailObj)
              .subscribe((resp: any) => {
                addTempPass.passTemp = String(resp.tempPass);
                addTempPass.passTimeOut = resp.timeOutDate;
                this.userService.userEdit(addTempPass)
                  .subscribe(() => {})
              })
          }
        }
      })
  }
 
  save(user:User){
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  ngOnInit(): void {}
}
