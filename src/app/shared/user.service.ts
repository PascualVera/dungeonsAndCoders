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
   getUsers(){
    return this.http.get(this.url+ `/usuario`)
  }
  register(usuario:User){
    return this.http.post(this.url + '/usuario',usuario)
  }
  login(usuario:object){
    return this.http.post(this.url +'/login',usuario)
  }
   userEdit(usuario:object){
    return this.http.put(this.url + '/usuario', usuario)
  }
   recuperarPass(mail:object){
    return this.http.post(this.url + `/sendMail`, mail)
  }
}
