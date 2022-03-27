import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    this.logueado = false
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    // this.url = 'http://localhost:4000'
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
  getCampaignMaster(id:any){
    return this.http.get(this.url + '/getMaster?id='+ id)
  }
  getCampaignPlayer(){
    return this.http.get(this.url + '/getPlayer?id='+ this.user.idUser )
  }
}
