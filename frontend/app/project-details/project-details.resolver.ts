import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectDetailsResolver implements Resolve<any> {

    constructor(private service: ProjectService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.paramMap.get('id'));
    }
}
