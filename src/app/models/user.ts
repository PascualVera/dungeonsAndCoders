export class User {
 
  public urlAvatar: string
  constructor(public name: string, public email:string ,public password: string){
    this.urlAvatar = '../../../assets/images/avatares/avatar00.png'
  }
}
