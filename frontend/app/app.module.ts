import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
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
import { SelectableDialogComponent } from './project-form/selectable-dialog.component';
import { OptionsService } from './options.service';
import { AuthService } from './auth.service';
import { environment } from 'frontend/environments/environment';
import { MAT_DATE_LOCALE } from '@angular/material';
import { StateService } from './state.service';

export function set_user(authService: AuthService) {
  return () => authService.setUser();
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    ProjectMapComponent,
    ProjectFormComponent,
    SelectableDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAP_API_KEY,
      libraries: ['places']
    }),
    routing
  ],
  providers: [
    OptionsService,
    ProjectService,
    StateService,
    AuthService,
    ProjectDetailsResolver,
    ProjectMapResolver,
    { provide: APP_INITIALIZER, useFactory: set_user, deps: [AuthService], multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  entryComponents: [
    SelectableDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
