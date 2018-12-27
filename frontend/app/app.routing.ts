import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectMapComponent } from './project-map/project-map.component';
import { ProjectDetailsResolver } from './project-details/project-details.resolver';
import { ProjectMapResolver } from './project-map/project-map.resolver';

const routes: Routes = [
  {
    path: 'project-map',
    component: ProjectMapComponent,
    resolve: { markers: ProjectMapResolver }
  },
  {
    path: 'project-list',
    component: ProjectListComponent
  },
  {
    path: 'project-create',
    component: ProjectCreateComponent
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent,
    resolve: { projectData: ProjectDetailsResolver }
  },
  {
    path: '',
    redirectTo: 'project-list',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { enableTracing: true });
