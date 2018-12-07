import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Object> {
    return this.http.get('/project');
  }

  getDetailsById(id): Observable<Object> {
    return this.http.get('/project/' + id);
  }

  delete(id): Observable<Object> {
    return this.http.delete('/project/' + id);
  }

  save(project) {
    this.http.post('/project', project)
      .subscribe(res => {
        return;
      }, (err) => {
        console.log(err);
      });
  }
}
