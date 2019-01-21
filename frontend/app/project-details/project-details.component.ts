import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { User } from '../auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  proj: any;
  editMode: boolean;
  adminUser: boolean;
  @ViewChild(ProjectFormComponent) projectForm: ProjectFormComponent;

  constructor(private service: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.proj = this.route.snapshot.data.projectData;
    this.editMode = false;
    const loggedUser = this.getLoggedUser();
    this.adminUser = loggedUser && loggedUser.admin;
  }

  public edit() {
    this.editMode = true;
  }

  public update(id: string) {
    if (this.projectForm.isValid()) {
      this.service.update(id, this.projectForm.getFormData()).subscribe(() => {
        this.router.navigate(['/project-list']);
      }, (err) => {
        console.log(err);
      });
    }
  }

  public delete(id: string) {
    const response = confirm('¿Seguro que desea borrar el proyecto?');

    if (response) {
      this.service.delete(id).subscribe(() => {
        this.router.navigate(['/project-list']);
      }, (err) => {
        console.log(err);
      });
    }
  }

  private getLoggedUser(): User {
    const loggedUserStr = localStorage.getItem('loggedUser');
    return JSON.parse(loggedUserStr);
  }
}
