import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  @Input() initData: any;
  _editMode: boolean;

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ProjectService, private router: Router) {
    this.form = this.fb.group({
      'title': this.fb.control('', [Validators.required]),
      'ref_name': this.fb.control(''),
      'ref_phone': this.fb.control(''),
      'ref_mail': this.fb.control('', [Validators.email]),
      'location': this.fb.group({
        'type': this.fb.control('Point'),
        'coordinates': this.fb.array([null, null], Validators.required)
      })
    });
  }

  get editMode(): boolean {
    return this._editMode;
  }

  @Input()
  set editMode(edit: boolean) {
    console.log(edit);
    this._editMode = edit;
    if (this._editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  ngOnInit() {
    if (!this.initData) {
      this.initData = {};
    }
    this.form.patchValue(this.initData);
  }

  saveProject() {
    console.log(this.form.value);
    this.service.save(this.form.value);
    this.router.navigate(['/project-list']);
  }
}
