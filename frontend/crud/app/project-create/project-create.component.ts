import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html'
})
export class ProjectCreateComponent implements OnInit {

  @ViewChild(ProjectFormComponent) projectForm: ProjectFormComponent;

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit() { }

  saveProject() {
    const formData = this.projectForm.getFormData();
    console.log(formData);
    this.service.save(formData);
    this.router.navigate(['/project-list']);
  }
}
