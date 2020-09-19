import {FormControl} from "@angular/forms";
import {RegexpConfig} from "./user-create-page/regexp.config";
import {AppModule} from "./app.module";

export interface ErrorObj { [key: string]: boolean }

export class UserCreateValidators {
  static checkCoincidence(password: any): any {
    try {
      const parentObj = password.parent?.controls;

      return UserCreateValidators.findCoincidence(password, parentObj) ? null : {foundCoincidence: true};
    } catch (error) { }
  }

  static validPassword({value}: FormControl): ErrorObj {
    try {
      return RegexpConfig.isValidPassword(value) ? null : {inValidFormat: true};
    } catch (error) { }
  }

  static validUserName({value}: FormControl): ErrorObj {
    try {
      return RegexpConfig.isValidUserName(value) ? null : {inValidFormat: true};
    } catch (error) { }
  }

  static validEmail({value}: FormControl): ErrorObj {
    try {
      return RegexpConfig.isValidEmail(value) ? null : {inValidFormat: true};
    } catch (error) { }
  }

  static checkUniqueEmail({value}: FormControl): ErrorObj {
    try {
      return AppModule.users.some( item => item.email === value) ? {notUnique: true} : null;
    } catch (error) { }
  }

  static findCoincidence(password: any, parentObj: any): boolean {
    return (password
             .value
             .indexOf(parentObj.userName.value) === -1) ||
           (password
             .value
             .indexOf(parentObj.email.value) === -1);
  }

  static heroSearchValidator({value}: FormControl): ErrorObj {
    try {
      return RegexpConfig.isValidHeroSearch(value) ? null : {wrongSearch: true};
    } catch (error) { }
  }
}
