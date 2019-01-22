import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { User } from '../auth.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  @ViewChild(ProjectFormComponent) projectForm: ProjectFormComponent;
  adminUser: boolean;

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit() {
    const loggedUser = this.getLoggedUser();
    this.adminUser = loggedUser && loggedUser.admin;
  }

  public saveProject() {
    if (this.projectForm.isValid()) {
      const formData = this.projectForm.getFormData();
      this.service.save(formData).subscribe(() => {
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
