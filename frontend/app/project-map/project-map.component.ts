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
  fitBounds = true;
  selectedMarker: Project;
  form: FormGroup;
  mapLat: number;
  mapLng: number;

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
    this.fitBounds = false;
    this.selectedMarker = marker;
    this.mapLat = marker.location.coordinates[0];
    this.mapLng = marker.location.coordinates[1];
  }

  filter(): void {
    this.fitBounds = true;
    this.selectedMarker = null;
    const fInput = this.form.get('filterInput').value;
    this.markers = this.allMarkers.filter(d =>
      d.title && d.title.includes(fInput) ||
      d.subjects && d.subjects.includes(fInput) ||
      d.ref_name && d.ref_name.includes(fInput));

    if (this.markers.length === 1) {
      this.selectedMarker = this.markers[0];
    } else {
      this.selectedMarker = null;
    }
  }
}
