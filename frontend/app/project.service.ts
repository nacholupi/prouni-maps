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

  iconUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_PROJ = '/api/project/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_PROJ);
  }

  public getById(id: string): Observable<Project> {
    return this.http.get<Project>(this.API_PROJ + id);
  }

  public update(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(this.API_PROJ + id, project);
  }

  public delete(id: string): Observable<Project> {
    return this.http.delete<Project>(this.API_PROJ + id);
  }

  public save(project: Project): Observable<Project> {
    return this.http.post<Project>(this.API_PROJ, project);
  }
}
