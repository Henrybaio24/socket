import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocComponent } from './doc/doc.component';

const routes: Routes = [{ path: '', component: DocsComponent },
  { path: 'lista', component: DocsListComponent},
  { path: 'documento', component: DocComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
