import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { ApprovalComponent } from './approval.component';

const routes: Routes = [
  {
    path: "",
    component: ApprovalComponent,
    children: [
      {
        path: "app-approval-request",
        component: ApprovalRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
