import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { Observable } from 'rxjs';
import { OptionsService } from '../options.service';
import { MapData } from './project-map.component';


@Injectable()
export class ProjectMapResolver implements Resolve<any> {

    constructor(private service: ProjectService, private opService: OptionsService) { }

    public resolve(): Observable<MapData> {
        return Observable.create((observer) => {
            const result = new MapData;
            return this.opService.getAll().subscribe(
                (value) => {
                    result.subjects = value.map['subjs'];
                    result.universities = value.map['universities'];
                    observer.next(result);
                },
                (error) => { observer.error(error); },
                () => {
                    this.service.getAll().subscribe(
                        (projs) => {
                            result.projects = projs;
                            observer.next(result);
                        },
                        (error) => { observer.error(error); },
                        () => {
                            const fixedProjs = new Array<Project>();
                            result.projects.forEach((pro, i) => {

                                if (fixedProjs.length !== 0) {
                                    fixedProjs.forEach((newMarkers) => {

                                        if (newMarkers.location.coordinates[0] === pro.location.coordinates[0] &&
                                            newMarkers.location.coordinates[1] === pro.location.coordinates[1]) {

                                            const a = 2 * Math.PI / result.projects.length;

                                            pro.location.coordinates[0] = pro.location.coordinates[0] + .00004 * Math.cos(a * i);
                                            pro.location.coordinates[1] = pro.location.coordinates[1] + .00004 * Math.sin(a * i);
                                        }
                                    });
                                }
                                fixedProjs.push(pro);

                                result.subjects.forEach((sub, j) => {
                                    if (pro.subject === sub) {
                                        pro.subject_idx = j;
                                    }
                                });
                            });
                            observer.complete();
                        }
                    );
                }
            );
        });
    }
}
