import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserThemeComponent } from './user-theme.component';

const routes: Routes = [
  {
    path: "",
    component: UserThemeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserThemeRoutingModule { }
