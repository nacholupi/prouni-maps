import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  {
    path: 'crud/project-list',
    component: ProjectListComponent,
    data: { title: 'Lista de proyectos' }
  },
  {
    path: 'crud/project-create',
    component: ProjectCreateComponent,
    data: { title: 'Crear proyecto nuevo' }
  },
  {
    path: 'crud/project-details/:id',
    component: ProjectDetailsComponent,
    data: { title: 'Detalles del proyecto' }
  },
  {
    path: 'crud/project-edit/:id',
    component: ProjectEditComponent,
    data: { title: 'Editar Proyecto' }
  },
  {
    path: '',
    redirectTo: 'crud/project-list',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: true });