import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserCreatePageComponent } from "./user-create-page/user-create-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { AuthGuard } from "./auth.guard";
import { HeroSelectionPageComponent } from "./hero-selection-page/hero-selection-page.component";
import { UserInfoComponent } from "./user-info-page/user-info/user-info.component";
import { HeroInfoComponent } from "./hero-info-page/hero-info/hero-info.component";

const routes: Routes = [
  //http://localhost::4200/ --> sign-in page
  {path: '', pathMatch: 'full', redirectTo: 'sign-in'},
  //http://localhost::4200/sign-in  --> sign-in page
  {path: 'sign-in', component: LoginPageComponent},
  //http://localhost::4200/create-new-user  --> new user creation page
  {path: 'create-new-user', component: UserCreatePageComponent},
  {path: 'main', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'hero-selection', component: HeroSelectionPageComponent},
      {path: 'user-info', component: UserInfoComponent},
      {path: 'hero-info', component: HeroInfoComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
