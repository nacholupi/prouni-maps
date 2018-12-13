import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html'
})
export class ProjectEditComponent implements OnInit {

  theProject: any = { location: { type: "Point", coordinates: [] } };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params['id']);
  }

  getProject(id) {
    this.http.get('/project/' + id).subscribe(data => {
      this.theProject = data;
    });
  }

  updateProject(id) {
    //this.theProject.updated_date = Date.now();
    this.http.put('/project/' + id, this.theProject)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/project-details', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }
}
