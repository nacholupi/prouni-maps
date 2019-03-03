import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OptionsService } from '../options.service';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  allMarkers: Project[];
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
    this.allMarkers = this.route.snapshot.data.markers;
    this.initSelectables();
  }

  private initSelectables(): void {
    this.service.getAll().subscribe(res => {
      this.subjects = res.map['subjs'];
      this.subjects.forEach((sub, i) => {
        this.allMarkers.forEach((mar) => {
          if (mar.subject === sub) {
            mar.iconUrl = './assets/images/markers/place.' + i + '.svg';
          }
        });
      });
      this.markers = this.allMarkers;
    });
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
    const fMarkers = this.allMarkers.filter(d =>
      d.title && d.title.includes(fValue) ||
      d.subject && d.subject.includes(fValue) ||
      d.ref_name && d.ref_name.includes(fValue));

    if (fMarkers.length !== 0) {
      this.markers = fMarkers;
      if (this.markers.length === 1) {
        this.selectedMarker = this.markers[0];
      }
    } else {
      this.noResults = true;
    }

    fInput.disable();
  }

  public clearFilter(): void {
    this.noResults = false;
    this.fitBounds = true;
    this.selectedMarker = null;
    this.markers = this.allMarkers;
    const fInput = this.form.get('filterInput');
    fInput.setValue('');
    fInput.enable();
  }
}
