import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

  theProject = { location: { type: "Point", coordinates: [] } };

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit() {
  }

  saveProject() {
    this.service.save(this.theProject);
    this.router.navigate(['/projects']);
  }
}
