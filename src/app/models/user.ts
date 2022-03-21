export class User {
  public idUser:number
  public urlAvatar: string
  constructor(public name: string, public email:string ,public password: string){
    this.idUser = 0
    this.urlAvatar = '../../../assets/images/avatares/avatar00.png'
  }
}
