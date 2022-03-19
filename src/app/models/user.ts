export class User {
  public tempPassword: string
  public expirationDate: Date
  public avater: string
  constructor(public userName: string, public email:string ,public password: string){
    this.expirationDate = new Date()
    this.tempPassword = ''
    this.avater = '../../../assets/images/avatares/avatar01.png'
  }
}
