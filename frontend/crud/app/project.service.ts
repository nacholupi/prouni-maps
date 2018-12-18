import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object> {
    return this.http.get('/project');
  }

  getById(id: string): Observable<Object> {
    return this.http.get('/project/' + id);
  }

  update(id: string, project: Object): Observable<Object> {
    return this.http.put('/project/' + id, project);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete('/project/' + id);
  }

  save(project: Object) {
    this.http.post('/project', project)
      .subscribe(res => {
        return;
      }, (err) => {
        console.log(err);
      });
  }
}
