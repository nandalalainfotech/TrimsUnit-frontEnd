import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalDocumentsDetailsComponent } from './legal-documents-details.component';
import { LegalDocumentsComponent } from './legal-documents/legal-documents.component';

const routes: Routes = [{
  path: "",
  component: LegalDocumentsDetailsComponent,
  children: [
 
    {
      path: "app-legal-documents",
      component: LegalDocumentsComponent,
        
    },
  
   
   ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalDocumentsDetailsRoutingModule { }
