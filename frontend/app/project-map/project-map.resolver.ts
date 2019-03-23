import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { ProjectService, Project } from '../project.service';
import { Observable } from 'rxjs';
import { OptionsService } from '../options.service';
import { ProjectMapComponent, MapData } from './project-map.component';


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
                                        pro.iconUrl = this.urlSvgMarker(j);
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

    public urlSvgMarker(j: number): string {
        const svg = this.subjectSvgMarker(j);
        return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(svg);
    }

    public subjectSvgMarker(j: number): string {
        const color = ProjectMapComponent.subjectColor(j);
        return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
            'width="30pt" height="30pt" viewBox="0 0 30 30" version="1.1"><g id="surface1">' +
            '<path style=" stroke:none;fill-rule:nonzero;fill:' + color + ';fill-opacity:1;" ' +
            'd="M 15 2.5 C 10.164062 2.5 6.25 6.414062 6.25 11.25 C 6.25 17.8125 15 27.5 15 27.5 ' +
            'C 15 27.5 23.75 17.8125 23.75 11.25 C 23.75 6.414062 19.835938 2.5 15 2.5 Z M 15 14.375' +
            ' C 13.273438 14.375 11.875 12.976562 11.875 11.25 C 11.875 9.523438 13.273438 8.125 15' +
            ' 8.125 C 16.726562 8.125 18.125 9.523438 18.125 11.25 C 18.125 12.976562 16.726562 14.375' +
            ' 15 14.375 Z M 15 14.375 "/></g></svg>';
    }
}
