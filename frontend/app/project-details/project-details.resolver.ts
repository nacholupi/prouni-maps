import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectDetailsResolver implements Resolve<Project> {

    constructor(private service: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        return this.service.getById(route.paramMap.get('id'));
    }
}
