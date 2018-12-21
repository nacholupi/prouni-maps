import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { Project } from '../project.service';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  markers: Project[];
  opened = false;
  selectedMarker: Project;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.markers = this.route.snapshot.data.markers;
    console.log(this.markers);
  }

  clickedMarker(marker: Project): void {
    this.selectedMarker = marker;
    this.opened = true;
  }
}
