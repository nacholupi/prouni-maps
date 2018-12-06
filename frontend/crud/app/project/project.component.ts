import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  projects: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/project').subscribe(data => {
      this.projects = data;
    });
  }
}
