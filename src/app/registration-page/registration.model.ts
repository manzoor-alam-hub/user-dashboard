export class RegistrationModel{
    public username:string;
    public email: string;
    public number:string
    public password: string;
    public confirmPassword:string;
    public acceptTerms:boolean;
    public role:string;
    public enable:boolean;
    public isAdmin:boolean;
    public id:string;
  constructor() {
    this.isAdmin = false;
  }
}