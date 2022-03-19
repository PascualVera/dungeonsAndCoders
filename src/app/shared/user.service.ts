import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string
  public users : User[]
  public logueado: boolean
  public user: User
  constructor(private http: HttpClient) { 
    this.users = [new User('pelagatos12','juancho@gmail.com','Contraseña1')]
    this.logueado = false
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    this.user = new User('','','')
  }
  register(usuario:User){
    this.users.push(usuario)
    console.log(this.http.post(this.url,usuario + '/usuario'))
    console.log(this.users)
    return this.http.post(this.url + '/usuario/',usuario)
  }
  login(usuario:User){
    this.logueado = true
    console.log(this.http.post(this.url,usuario + '/login'))
    return this.http.post(this.url,usuario)
  }
}
