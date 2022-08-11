import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserRegistrationComponent } from './user-registration.component';

const routes: Routes = [
    {
        path: '',
        component: UserRegistrationComponent,
    },
    {
        path: 'app-login',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRegistrationRoutingModule { }
