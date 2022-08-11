import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDetailsComponent } from './emp-details.component';
import { EmployeeComponent } from './employee/employee.component';

import { StatutoryPlanComponent } from './statutory-plan/statutory-plan.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';


const routes: Routes = [{
  path: "",
  component: EmpDetailsComponent,
  children: [
 
    {
      path: "app-employee",
      component: EmployeeComponent,
        
    },
    {
      path: "app-training-plan",
      component: TrainingPlanComponent,
        
    },
    {
      path: "app-statutory-plan",
      component:  StatutoryPlanComponent,
        
    },
  
   
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpDetailsRoutingModule { }
