import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectMapResolver implements Resolve<any> {

    constructor(private service: ProjectService) { }

    resolve() {
        return this.service.getAll();
    }
}
