import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanResourcesComponent } from './human-resources.component';

const routes: Routes = [
  {
    path: "",
    component: HumanResourcesComponent,
    children: [
      {
        // path: "app-legal-documents-details",
        // component: LegalDocumentsDetailsComponent ,
        path: "app-legal-documents-details",
        loadChildren: () => import("./legal-documents-details/legal-documents-details.module").then(m => m.LegalDocumentsDetailsModule)
      },
      {
        // path: "app-legal-documents-details",
        // component: LegalDocumentsDetailsComponent ,
        path: "app-emp-details",
        loadChildren: () => import("./emp-details/emp-details.module").then(m => m.EmpDetailsModule)
      },
      
      {
        path: "app-facilitys",
        loadChildren: () => import("./facilitys/facilitys.module").then(m => m.FacilitysModule)
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
