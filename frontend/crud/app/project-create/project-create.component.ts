import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

  theProject = { location: { type: "Point", coordinates: [] } };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveProject() {
    console.log(this.theProject)
    this.http.post('/project', this.theProject)
      .subscribe(res => {
        this.router.navigate(['/projects']);
      }, (err) => {
        console.log(err);
      }
      );
  }
}
