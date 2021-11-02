export interface LoginForm {
  loginMethod:number,
  phone:string,
  password:string,
  md5_password?:string,
  captcha?:string//验证码
  email?:'',
}