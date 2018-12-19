import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any;

  constructor(private service: ProjectService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.projects = new MatTableDataSource(res);
    });
  }
}
