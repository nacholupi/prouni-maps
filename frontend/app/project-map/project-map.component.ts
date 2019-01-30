import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      'filterInput': this.fb.control(''),
    });
  }

  ngOnInit() {
    this.allMarkers = this.route.snapshot.data.markers;
    this.markers = this.allMarkers;
  }

  public clickedMarker(marker: Project): void {
    this.fitBounds = false;
    this.selectedMarker = marker;
    this.cdr.detectChanges();
    this.mapLat = marker.location.coordinates[0];
    this.mapLng = marker.location.coordinates[1];
  }

  public closeSidenav(): void {
    this.fitBounds = false;
    const marker = this.selectedMarker;
    this.selectedMarker = null;
    this.cdr.detectChanges();
    if (this.selectedMarker) {
      this.mapLat = marker.location.coordinates[0];
      this.mapLng = marker.location.coordinates[1];
    }
  }

  public filter(): void {
    this.fitBounds = true;
    this.selectedMarker = null;
    const fInput = this.form.get('filterInput').value;
    this.markers = this.allMarkers.filter(d =>
      d.title && d.title.includes(fInput) ||
      d.subject && d.subject.includes(fInput) ||
      d.ref_name && d.ref_name.includes(fInput));

    if (this.markers.length === 1) {
      this.selectedMarker = this.markers[0];
    } else {
      this.selectedMarker = null;
    }
  }
}
