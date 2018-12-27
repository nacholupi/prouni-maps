import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectService } from './project.service';
import { ProjectMapComponent } from './project-map/project-map.component';
import { ProjectDetailsResolver } from './project-details/project-details.resolver';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectMapResolver } from './project-map/project-map.resolver';



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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA0TQ6QmZqwlj5I7mmbs5yjvRH7dz8zdeA',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    routing
  ],
  providers: [
    ProjectService,
    ProjectDetailsResolver,
    ProjectMapResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
