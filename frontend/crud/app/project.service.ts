import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  nodeURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Object> {
    return this.http.get(this.nodeURL + '/project');
  }

  getById(id: string): Observable<Object> {
    return this.http.get(this.nodeURL + '/project/' + id);
  }

  update(id: string, project: Object): Observable<Object> {
    return this.http.put(this.nodeURL + '/project/' + id, project);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(this.nodeURL + '/project/' + id);
  }

  save(project: Object) {
    this.http.post(this.nodeURL + '/project', project)
      .subscribe(res => {
        return;
      }, (err) => {
        console.log(err);
      });
  }
}
