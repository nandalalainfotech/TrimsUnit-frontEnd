import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileDocumentComponent } from './file-document/file-document.component';
import { FileMasterComponent } from './file-master.component';

const routes: Routes = [
  {
    path: "",
    component: FileMasterComponent,
    children: [
      {
        path: "app-file-document",
        component: FileDocumentComponent
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileMasterRoutingModule { }
