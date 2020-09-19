import {FormControl} from "@angular/forms";
import {RegexpConfig} from "./user-create-page/regexp.config";
import {AppModule} from "./app.module";

export interface ErrorObj { [key: string]: boolean }

export class UserCreateValidators {
  static checkCoincidence(password: any): any {
    try {
      const parentObj = password.parent?.controls;
      if (UserCreateValidators.findCoincidence(password, parentObj)) {
        return null;
      }
      return {foundCoincidence: true};
    } catch (error) { }
  }

  static validPassword({value}: FormControl): ErrorObj {
    try {
      if (RegexpConfig.isValidPassword(value)) {
        return null;
      }
      return {inValidFormat: true};
    } catch (error) { }
  }

  static validUserName({value}: FormControl): ErrorObj {
    try {
      if (RegexpConfig.isValidUserName(value)) {
        return null;
      }
      return {inValidFormat: true};
    } catch (error) { }
  }

  static validEmail({value}: FormControl): ErrorObj {
    try {
      if (RegexpConfig.isValidEmail(value)) {
        return null;
      }
      return {inValidFormat: true};
    } catch (error) { }
  }

  static checkUniqueEmail({value}: FormControl): ErrorObj {
    try {
      if(AppModule.users.some( item => item.email === value)) {
        return {notUnique: true};
      }
      return null;
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
      if(RegexpConfig.isValidHeroSearch(value)) {
        return null;
      }
      return {wrongSearch: true};
    } catch (error) { }
  }
}
