import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectMapComponent } from './project-map/project-map.component';

const routes: Routes = [
  {
    path: 'project-map',
    component: ProjectMapComponent,
    data: { title: 'Mapa' }
  },
  {
    path: 'project-list',
    component: ProjectListComponent,
    data: { title: 'Lista de proyectos' }
  },
  {
    path: 'project-create',
    component: ProjectCreateComponent,
    data: { title: 'Crear proyecto nuevo' }
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    data: { title: 'Detalles del proyecto' }
  },
  {
    path: 'project-edit/:id',
    component: ProjectEditComponent,
    data: { title: 'Editar Proyecto' }
  },
  {
    path: '',
    redirectTo: 'project-list',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: true });