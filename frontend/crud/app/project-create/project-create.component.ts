import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  form = this.fb.group({
    "title": this.fb.control('', [Validators.required]),
    "ref_mail": this.fb.control('', [Validators.email]),
    "location": this.fb.group({
      "type": this.fb.control('Point'),
      "coordinates": this.fb.array([null, null], Validators.required)
    })
  });

  constructor(private fb: FormBuilder, private service: ProjectService, private router: Router) {
  }

  ngOnInit() {
  }

  saveProject() {
    console.log(this.form.value)
    this.service.save(this.form.value);
    this.router.navigate(['/project-list']);
  }
}
