import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id: string;
  title: string;
  subject: string;
  purpose: string;
  target_population: string[];

  university: string;
  ref_name: string;
  ref_title: string;
  ref_phone: string;
  ref_mail: string;

  location: {
    type: string;
    coordinates: number[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  nodeURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.nodeURL + '/project');
  }

  getById(id: string): Observable<Project> {
    return this.http.get<Project>(this.nodeURL + '/project/' + id);
  }

  update(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(this.nodeURL + '/project/' + id, project);
  }

  delete(id: string): Observable<Project> {
    return this.http.delete<Project>(this.nodeURL + '/project/' + id);
  }

  save(project: Project) {
    this.http.post<Project>(this.nodeURL + '/project', project)
      .subscribe(res => {
        return;
      }, (err) => {
        console.log(err);
      });
  }
}
