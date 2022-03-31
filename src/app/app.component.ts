import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dungeonsAndCoder';
  constructor(public userService:UserService,private router:Router){
    this.userService.user = JSON.parse(this.getUser())
    if(this.getUser() == null && this.router.url != '/'){
      this.router.navigate([''])
    }
  }
  getUser(){
    return sessionStorage.getItem('user') 
  }
}
