import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OptionsService } from '../options.service';
import { MapData } from './project-map.resolver';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  allData: MapData;
  markers: Project[];
  fitBounds = true;
  noResults = false;
  selectedMarker: Project;
  form: FormGroup;
  mapLat: number;
  mapLng: number;
  subjects = new Array();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: OptionsService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      'filterInput': this.fb.control(''),
      'subject': this.fb.control(''),
    });
  }

  ngOnInit() {
    this.allData = this.route.snapshot.data.markers;
    this.markers = this.allData.projects;
    this.subjects = this.allData.subjects;
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
    this.noResults = false;
    this.fitBounds = true;
    this.selectedMarker = null;
    const fInput = this.form.get('filterInput');
    const fValue = fInput.value;
    const sValue = this.form.get('subject').value;
    let fMarkers = this.allData.projects;

    if (fValue && fValue.length !== 0) {
      fInput.disable();
      const lowerValue = fValue.toLocaleLowerCase();
      console.log(lowerValue);
      fMarkers = fMarkers.filter(d =>
        d.title && d.title.toLocaleLowerCase().includes(lowerValue) ||
        d.purpose && d.purpose.toLocaleLowerCase().includes(lowerValue) ||
        d.ref_name && d.ref_name.toLocaleLowerCase().includes(lowerValue));
    }

    if (sValue && sValue.length !== 0) {
      fMarkers = fMarkers.filter(d =>
        d.subject && d.subject === sValue);
    }

    if (fMarkers.length === 0) {
      this.noResults = true;
    } else {
      this.markers = fMarkers;
      if (this.markers.length === 1) {
        this.selectedMarker = this.markers[0];
      }
    }
  }

  public clearFilter(): void {
    this.noResults = false;
    this.fitBounds = true;
    this.selectedMarker = null;
    this.markers = this.allData.projects;
    const fInput = this.form.get('filterInput');
    fInput.setValue('');
    fInput.enable();
    this.filter();
  }
}
