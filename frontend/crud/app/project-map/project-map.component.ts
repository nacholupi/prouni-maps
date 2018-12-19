import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-map',
  templateUrl: './project-map.component.html',
  styleUrls: ['./project-map.component.css']
})
export class ProjectMapComponent implements OnInit {

  markers: Object;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.markers = this.route.snapshot.data.markers;
  }
}
