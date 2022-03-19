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
  constructor(private http: HttpClient) { 
    this.users = []
    this.logueado = false
    this.url = 'https://dungeons-and-coders-api.herokuapp.com/'
  }
  register(usuario:User){
    this.users.push(usuario)
  }
  login(usuario:User){
    this.logueado = true
    console.log(this.http.post(this.url,usuario).subscribe())
    return this.http.post(this.url,usuario).subscribe()
  }
}
