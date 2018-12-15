import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectService } from './project.service';
import { ProjectMapComponent } from './project-map/project-map.component';
import { ProjectDetailsResolver } from './project-details/project-details.resolver';
import { ProjectFormComponent } from './project-form/project-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    ProjectMapComponent,
    ProjectFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    routing
  ],
  providers: [
    ProjectService,
    ProjectDetailsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
