import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuth = false;
  public needToReLogin = false;

  login(formData) {
    const ONE_HOUR_MILLISECONDS = 3600000;

    this.isAuth = true;
    localStorage.currentUser = JSON.stringify({
      "email" : formData.email,
      ...JSON.parse(localStorage[formData.email]),
      "sessionExpTime" : Date.now() + 10000 ,
    })
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem("currentUser");
  }

  isAuthenticated(): boolean {
    try{
      if (this.isExpiredSession()) {
        this.isAuth = false;
        this.logout();
        this.needToReLogin = true;
      } else {
        this.isAuth = true;
      }
    } catch (error) { }
    return this.isAuth;
  }

  isExpiredSession() {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')).sessionExpTime) < Date.now();
  }

}
