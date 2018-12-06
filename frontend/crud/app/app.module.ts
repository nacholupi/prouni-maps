import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const appRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent,
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
  { path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    ProjectEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
