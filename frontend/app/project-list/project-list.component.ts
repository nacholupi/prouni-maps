import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectService, Project } from '../project.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements AfterViewInit {

  projects: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProjectService) { }

  ngAfterViewInit() {
    this.service.getAll().subscribe(res => {
      this.projects = new MatTableDataSource(res);
      this.projects.sort = this.sort;
      this.projects.paginator = this.paginator;
    });
  }
}
