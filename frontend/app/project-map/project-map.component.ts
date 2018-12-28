import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { Project } from '../project.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  allMarkers: Project[];
  markers: Project[];
  opened = false;
  selectedMarker: Project;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      'filterInput': this.fb.control(''),
    });
  }

  ngOnInit() {
    this.allMarkers = this.route.snapshot.data.markers;
    this.markers = this.allMarkers;
  }

  clickedMarker(marker: Project): void {
    this.selectedMarker = marker;
    this.opened = true;
  }

  filter(): void {
    const fInput = this.form.get('filterInput').value;
    this.opened = false;
    this.markers = this.allMarkers.filter(d =>
      d.title && d.title.includes(fInput) ||
      d.subject && d.subject.includes(fInput) ||
      d.ref_name && d.ref_name.includes(fInput));
  }
}
