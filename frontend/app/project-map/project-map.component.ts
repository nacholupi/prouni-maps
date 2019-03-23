import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  universities = new Array();

  public static subjectColor(j: number): string {
    const colors = [
      '#673AB7', '#FF5252', '#C2185B', '#40C4FF',
      '#388E3C', '#F9A825', '#FFEB3B', '#9E9E9E',
      '#795548', '#9E9E9E', '#009688', '#607D8B',
      '#0277BD',
    ];

    const defaultColor = '#000000';

    if (colors.length > j) {
      return colors[j];
    }
    return defaultColor;
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cdr: ChangeDetectorRef,
    matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('marker', sanitizer.bypassSecurityTrustResourceUrl('assets/images/markers/place.svg'));

    this.form = this.fb.group({
      'filterInput': this.fb.control(''),
      'university': this.fb.control(''),
      'subject': this.fb.control(''),
    });
  }

  ngOnInit() {
    this.allData = this.route.snapshot.data.markers;
    this.markers = this.allData.projects;
    this.subjects = this.allData.subjects;
    this.universities = this.allData.universities;
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
    const uValue = this.form.get('university').value;
    let fMarkers = this.allData.projects;

    if (fValue && fValue.length !== 0) {
      fInput.disable();
      const lowerValue = fValue.toLocaleLowerCase();
      fMarkers = fMarkers.filter(d =>
        d.title && d.title.toLocaleLowerCase().includes(lowerValue) ||
        d.purpose && d.purpose.toLocaleLowerCase().includes(lowerValue) ||
        d.ref_name && d.ref_name.toLocaleLowerCase().includes(lowerValue));
    }

    if (sValue && sValue.length !== 0) {
      fMarkers = fMarkers.filter(d =>
        d.subject && d.subject === sValue);
    }

    if (uValue && uValue.length !== 0) {
      fMarkers = fMarkers.filter(d =>
        d.university && d.university === uValue);
    }

    if (fMarkers.length === 0) {
      this.noResults = true;
    }

    this.markers = fMarkers;
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

  public subjectColor(j: number): string {
    return ProjectMapComponent.subjectColor(j);
  }
}

export class MapData {
  projects: Project[];
  subjects: string[];
  universities: string[];
}
