export class RegexpConfig {
  static userNameRegexp = new RegExp('^([a-z][a-z]*)(-[a-z]+)$|^([a-z][a-z]*)([A-Z][a-z]*)$|^([A-Z][a-z]*) ([A-Z][a-z]*)$');
  static emailRegexp = new RegExp('^([a-zA-Z]*\\.?){1,3}[^\\.]*@([a-zA-Z]{1,5})(.com|.org|.net|.co|.us)$');
  static passwordRegexp = new RegExp('(.*[A-Z].*)(.*[0-9].*)(.*[$%.&!].*)');
  static heroSearchRegexp = new RegExp('^([a-zA-Z]+ ?)+$');

  static isValidUserName(userName: string): RegExpMatchArray {
    return userName.match(RegexpConfig.userNameRegexp);
  }

  static isValidEmail(email: string): RegExpMatchArray {
    return email.match(RegexpConfig.emailRegexp);
  }

  static isValidPassword(password: string): RegExpMatchArray {
    return password.match(RegexpConfig.passwordRegexp);
  }

  static isValidHeroSearch(heroSearchValue: string): RegExpMatchArray {
    return heroSearchValue.match(RegexpConfig.heroSearchRegexp);
  }

}
