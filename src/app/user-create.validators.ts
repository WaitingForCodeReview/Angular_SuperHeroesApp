import {FormControl} from "@angular/forms";
import {RegexpConfig} from "./user-create-page/regexp.config";

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

  static validPassword({value}: FormControl) {
    try {
      if (RegexpConfig.isValidPassword(value)) {
        return null;
      }
      return {inValidFormat: true}
    } catch (error) { }
  }

  static validUserName({value}: FormControl) {
    try {
      if (RegexpConfig.isValidUserName(value)) {
        return null;
      }
      return {inValidFormat: true}
    } catch (error) { }
  }

  static validEmail({value}: FormControl) {
    try {
      if (RegexpConfig.isValidEmail(value)) {
        return null;
      }
      return {inValidFormat: true}
    } catch (error) { }
  }

  static findCoincidence(password: any, parentObj: any) {
    return (password
             .value
             .indexOf(parentObj.userName.value) === -1) ||
           (password
             .value
             .indexOf(parentObj.email.value) === -1);
  }

}
