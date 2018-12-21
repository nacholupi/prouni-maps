import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectMapResolver implements Resolve<any> {

    constructor(private service: ProjectService) { }

    resolve(): Observable<Project[]> {
        return this.service.getAll();
    }
}
