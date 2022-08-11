import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsernameComponent } from './username/username.component';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    children: [
      {
        path: "app-registration",
        component: RegistrationComponent,
      },
      {
        path: "app-password",
        component: PasswordComponent,
      },
      {
        path: "app-username",
        component: UsernameComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
