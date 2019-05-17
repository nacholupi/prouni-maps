import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as MarkerClusterer from '@google/markerclusterer';
import { } from 'googlemaps';
import { Project } from '../project.service';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  @ViewChild('map') mapElem: ElementRef;

  allData: MapData;
  projects: Array<Project>;
  subjects: Array<string>;
  universities: Array<string>;
  states: Array<string>;
  map: google.maps.Map;
  markerCluster: any;
  restorePrevMarkerFunc: () => void;

  selectedProject: Project;
  form: FormGroup;
  noResults = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
    matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('marker', sanitizer.bypassSecurityTrustResourceUrl('assets/images/markers/place.svg'));

    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });

    this.form = this.fb.group({
      'filterInput': this.fb.control(''),
      'university': this.fb.control(''),
      'subject': this.fb.control(''),
      'state': this.fb.control(''),
    });
  }

  ngOnInit() {
    this.allData = this.route.snapshot.data.markers;
    this.projects = this.allData.projects;
    this.subjects = this.allData.subjects;
    this.universities = this.allData.universities;
    this.states = this.allData.states;
    this.map = this.createMap();
    this.addMarkersToMap(this.projects);
  }

  private createMap(): google.maps.Map {
    const mapProp = {
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      center: new google.maps.LatLng(-39, -64.63),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return new google.maps.Map(this.mapElem.nativeElement, mapProp);
  }

  private addMarkersToMap(projects: Array<Project>) {
    const markers = Array<google.maps.Marker>();
    const bounds = new google.maps.LatLngBounds();

    projects.forEach(p => {
      const latLng = new google.maps.LatLng(p.location.coordinates[0], p.location.coordinates[1]);
      const marker = new google.maps.Marker({
        position: latLng,
        icon: {
          path: 'M 15 2.5 C 10.164062 2.5 6.25 6.414062 6.25 11.25 C 6.25 17.8125 15 27.5 15 27.5 ' +
            'C 15 27.5 23.75 17.8125 23.75 11.25 C 23.75 6.414062 19.835938 2.5 15 2.5 Z M 15 14.375' +
            ' C 13.273438 14.375 11.875 12.976562 11.875 11.25 C 11.875 9.523438 13.273438 8.125 15 ' +
            '8.125 C 16.726562 8.125 18.125 9.523438 18.125 11.25 C 18.125 12.976562 16.726562 14.375' +
            ' 15 14.375 Z M 15 14.375 ',
          anchor: new google.maps.Point(15, 30),
          strokeColor: '#FFFFFF',
          fillColor: this.subjectColor(p.subject_idx),
          fillOpacity: 1.0,
          scale: 1.4
        },
      });

      marker.addListener('click', () => {
        if (this.restorePrevMarkerFunc) {
          this.restorePrevMarkerFunc();
        }
        this.map.setCenter(marker.getPosition());
        this.selectedProject = p;
        (marker.getIcon() as google.maps.Symbol).scale = 1.5;
        (marker.getIcon() as google.maps.Symbol).strokeColor = '#000000';
        marker.setIcon(marker.getIcon());
        this.restorePrevMarkerFunc = () => {
          (marker.getIcon() as google.maps.Symbol).scale = 1.4;
          (marker.getIcon() as google.maps.Symbol).strokeColor = '#FFFFFF';
          marker.setIcon(marker.getIcon());
        };
      });
      markers.push(marker);
      bounds.extend(latLng);
    });

    this.markerCluster = new MarkerClusterer(this.map, markers, {
      maxZoom: 20,
      gridSize: 30,
      imagePath: '/assets/images/cluster/m'
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
  }

  public closeSidenav(): void {
    this.selectedProject = null;
  }

  public filter(): void {
    this.clearPreviousMarkers();
    this.noResults = false;
    this.selectedProject = null;
    const fInput = this.form.get('filterInput');
    const fValue = fInput.value;
    const sValue = this.form.get('subject').value;
    const uValue = this.form.get('university').value;
    const stValue = this.form.get('state').value;
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

    if (stValue && stValue.length !== 0) {
      fMarkers = fMarkers.filter(d =>
        d.state && d.state === stValue);
    }

    if (fMarkers.length === 0) {
      this.noResults = true;
    }

    this.projects = fMarkers;
    this.addMarkersToMap(this.projects);
  }

  private clearPreviousMarkers() {
    this.markerCluster.clearMarkers();
  }

  public clearFilter(): void {
    this.noResults = false;
    this.selectedProject = null;
    this.projects = this.allData.projects;
    const fInput = this.form.get('filterInput');
    fInput.setValue('');
    fInput.enable();
    this.filter();
  }

  public subjectColor(j: number): string {
    const colors = [
      '#E60026', '#673AB7', '#C2185B', '#2F4273',
      '#F9A825', '#FF0080', '#FFEB3B', '#9E9E9E',
      '#795548', '#B695C0', '#FF7F50', '#607D8B',
      '#0277BD',
    ];

    const defaultColor = '#000000';

    if (colors.length > j) {
      return colors[j];
    }
    return defaultColor;
  }
}

export class MapData {
  projects: Project[];
  subjects: string[];
  universities: string[];
  states: string[];
}
