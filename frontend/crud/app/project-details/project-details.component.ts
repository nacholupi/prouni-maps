import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {

  proj: any = { location: { type: "Point", coordinates: [] } };

  constructor(private router: Router, private route: ActivatedRoute, private service: ProjectService) { }

  ngOnInit() {
    this.getProjectDetail(this.route.snapshot.params['id']);
  }

  getProjectDetail(id) {
    this.service.getDetailsById(id)
      .subscribe(data => {
        this.proj = data;
      });
  }

  deleteProject(id) {
    this.service.delete(id)
      .subscribe(() => {
        this.router.navigate(['/projects']);
      }, (err) => {
        console.log(err);
      });
  }
}
