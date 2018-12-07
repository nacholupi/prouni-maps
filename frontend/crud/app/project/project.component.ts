import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  projects: any;

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.projects = res;
    });
  }
}
