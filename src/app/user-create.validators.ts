import {FormControl} from "@angular/forms";

export class UserCreateValidators {
  static checkCoincidence(password: any): any {
    const checked =
      (password.value.indexOf(password.parent?.controls.userName.value) === -1) || (password.value.indexOf(password.parent?.controls.email.value) === -1);

   if (checked) {
     return null;
   }
   return {foundCoincidence: true};
  }

  static oneUpperLetter(password: FormControl) {
    try {
      if (password.value.match(new RegExp('(.*[A-Z].*)'))) {
        return null;
      }
      return {noUpperLetter: true};
    } catch (error) { }
  }

  static oneDigit(password: FormControl) {
    try {
      if (password.value.match(new RegExp('(.*[0-9].*)'))) {
        return null;
      }
      return {noDigit: true};
    } catch (error) { }
  }

  static oneSpecialSymbol(password: FormControl) {
    try {
      if (password.value.match(new RegExp('(.*[$%.&!].*)'))) {
        return null;
      }
      return {noSpecialSymbol: true};
    } catch (error) { }
  }

  static validUserName(userName: FormControl) {
    const kebabCase = new RegExp('^([a-z][a-z]*)(-[a-z]+)$');
    const camelCase = new RegExp('^([a-z][a-z]*)([A-Z][a-z]*)$');
    const spaceCase = new RegExp('^([A-Z][a-z]*) ([A-Z][a-z]*)$');

    try {
      const checked = (userName.value.match(kebabCase)) || (userName.value.match(camelCase)) || (userName.value.match(spaceCase));

      if (checked) {
        return null;
      }
      return {inValidFormat: true}
    } catch (error) { }
  }

  // (.com|.org|.net|.co|.us)$  : for allowed domains
  static checkDomain(email: FormControl) {
    const allowedDomains = new RegExp('(.com|.org|.net|.co|.us)$');

    try {
      if(email.value.match(allowedDomains)) {
        return null;
      }
      return {invalidDomain: true};
    } catch (error) { }
  }

  static checkAfterAt(email: FormControl) {
    const afterAt = new RegExp('@([a-zA-Z]{1,5})([.])([a-z]*)$');

    try {
      if(email.value.match(afterAt)) {
        return null;
      }
      return {invalidAfterAt: true};
    } catch (error) { }
  }

  static checkDots(email: FormControl) {
    try {
      if(email.value.split('.').length < 6) {
        return null;
      }
      return {tooManyDots: true};
    } catch (error) { }
  }
}
