import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'app-user-registration',
        loadChildren: () => import("./user-registration/user-registration.module").then(m => m.UserRegistrationModule),
    },
    {
        path: 'app-dash-board',
        loadChildren: () => import("./dash-board/dash-board.module").then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
