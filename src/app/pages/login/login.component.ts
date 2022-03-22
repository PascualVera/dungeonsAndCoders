import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}

  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = visible ? 'flex' : 'none';
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
          this.router.navigate(['/inicio']);
          this.userService.user = data.resultado;
        } else {
          identificador.setAttribute('class', 'error');
          pass.setAttribute('class', 'error');
          validate.setAttribute('class', 'check_err');
        }
      });
    }
  }

  recuperarPass(mail: HTMLInputElement, verify: HTMLElement) {

    let mailObj = { email: mail.value };
    let addTempPass = {
      idUser: '',
      passTemp: '',
      passTimeOut: '',
    };

    this.userService.recuperarPass(mailObj).subscribe((data: any) => {
      addTempPass.passTemp = String(data.tempPass);
      addTempPass.passTimeOut = data.timeOutDate;
      this.userService.getUsers().subscribe((data: any) => {
        for (const user of data.resultado) {
          if (user.email == mail.value.toLowerCase()) {
            addTempPass.idUser = user.idUser;
          }
        }
        this.userService.userEdit(addTempPass).subscribe((data) => {
          console.log(data);
          verify.style.visibility = 'visible';
        });
      });
    });
  }

  ngOnInit(): void {}
}
