export class RegexpConfig {
  static userNameRegexp = new RegExp('^([a-z][a-z]*)(-[a-z]+)$|^([a-z][a-z]*)([A-Z][a-z]*)$|^([A-Z][a-z]*) ([A-Z][a-z]*)$');
  static emailRegexp = new RegExp('^([a-zA-Z]*\\.?){1,3}[^\\.]*@([a-zA-Z]{1,5})(.com|.org|.net|.co|.us)$');
  static passwordRegexp = new RegExp('(.*[A-Z].*)(.*[0-9].*)(.*[$%.&!].*)');

  static isValidUserName(userName: string) {
    return userName.match(RegexpConfig.userNameRegexp);
  }

  static isValidEmail(email: string) {
    return email.match(RegexpConfig.emailRegexp);
  }

  static isValidPassword(password: string) {
    return password.match(RegexpConfig.passwordRegexp);
  }

}
