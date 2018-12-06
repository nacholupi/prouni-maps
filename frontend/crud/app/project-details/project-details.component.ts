import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {

  proj: any = { location: { type: "Point", coordinates: [] } };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getProjectDetail(this.route.snapshot.params['id']);
  }

  getProjectDetail(id) {
    this.http.get('/project/' + id).subscribe(data => {
      this.proj = data;
    });
  }

  deleteProject(id) {
    this.http.delete('/project/' + id)
      .subscribe(res => {
        this.router.navigate(['/projects']);
      }, (err) => {
        console.log(err);
      });
  }
}
