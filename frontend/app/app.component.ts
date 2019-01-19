import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  writer = false;
  authUser = false;

  constructor(private service: AuthService) {
  }

  ngOnInit() {
    this.writer = this.service.isWriter();
    this.authUser = this.service.isAuth();
  }
}
