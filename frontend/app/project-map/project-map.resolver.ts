import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { Observable } from 'rxjs';
import { OptionsService } from '../options.service';


export class MapData {
    projects: Project[];
    subjects: string[];
}

@Injectable()
export class ProjectMapResolver implements Resolve<any> {

    constructor(private service: ProjectService, private opService: OptionsService) { }

    resolve(): Observable<MapData> {
        return Observable.create((observer) => {
            const result = new MapData;
            return this.opService.getAll().subscribe(
                (value) => {
                    result.subjects = value.map['subjs'];
                    observer.next(result);
                },
                (error) => { observer.error(error); },
                () => {
                    this.service.getAll().subscribe(
                        (value) => {
                            result.projects = value;
                            observer.next(result);
                        },
                        (error) => { observer.error(error); },
                        () => {
                            result.projects.forEach((pro) => {
                                result.subjects.forEach((sub, i) => {
                                    if (pro.subject === sub) {
                                        pro.iconUrl = './assets/images/markers/place.' + i + '.svg';
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
