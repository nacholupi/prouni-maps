import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  projects: any;

  constructor(private service: ProjectService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.projects = res;
    });
  }
}
