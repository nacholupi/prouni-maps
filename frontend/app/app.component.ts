import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  loggedUser: User;

  constructor(private service: AuthService) {
  }

  ngOnInit() {
    this.loggedUser = this.getLoggedUser();
  }

  public logout(): void {
    this.service.logout().subscribe(() => {
      this.ngOnInit();
    }, (err) => {
      this.ngOnInit();
      console.log(err);
    });
  }

  private getLoggedUser(): User {
    const loggedUserStr = localStorage.getItem('loggedUser');
    return JSON.parse(loggedUserStr);
  }
}
