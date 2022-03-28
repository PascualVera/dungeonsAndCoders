import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dungeonsAndCoder';
  constructor(public userService:UserService){
    this.userService.user = JSON.parse(this.getUser())
  }
  getUser(){
    return sessionStorage.getItem('user') 
  }
}
