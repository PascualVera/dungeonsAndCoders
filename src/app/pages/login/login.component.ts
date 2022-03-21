import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {}
  // TODO: Provisionalpara abrir modal
  modalPass(veloModalPass: HTMLElement, visible: boolean) {
    veloModalPass.style.display = visible ? 'flex' : 'none';
  }
  checkPassword(password: HTMLInputElement, verificacion: HTMLElement) {
    password.setAttribute('class', 'error');
    verificacion.setAttribute('class', 'check_err');
  }
  login(identificador: any, pass: any, validate: HTMLElement) {
    let user = {
      nameEmail: identificador.value,
      password: pass.value,
    };
    this.userService.login(user).subscribe((data: any) => {
      if (data.ok) {
        this.router.navigate(['/inicio']);
        this.userService.user = data.resultado;
      } else {
        this.checkPassword(pass, validate);
      }
    });
  }

  recuperarPass(mail: HTMLInputElement, verify:HTMLElement) {
    let mailObj = { email: mail.value };
    let addTempPass = {
      idUser: '',
      passTemp: '',
      passTimeOut: '',
    };

    this.userService.recuperarPass(mailObj).subscribe((data: any) => {
      addTempPass.passTemp = String(data.tempPass);
      addTempPass.passTimeOut = data.timeOutDate;
    });
    setTimeout(() => {
      this.userService.getUsers().subscribe((data: any) => {
        for (const user of data.resultado) {
          if (user.email == mail.value) {
            addTempPass.idUser = user.idUser;
          }
        }
      });
    }, 2000);
    setTimeout(() => {
      console.log(addTempPass);
      this.userService.userEdit(addTempPass).subscribe((data) => {
        console.log(data);
        verify.style.visibility = 'visible'
      });
    }, 2200);
  }
  ngOnInit(): void {}
}
