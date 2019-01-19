import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  oauthID: string;
  name: string;
  role: string;
  created: Date;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_LOGGEDUSER = '/auth/loggedUser';
  API_LOGOUT = '/auth/logout';
  logUs: User;

  constructor(private http: HttpClient) {
    this.logUs = null;
  }

  setUser(): Promise<void | User> {
    return this.http.get<User>(this.API_LOGGEDUSER)
      .toPromise()

      .then(user => {
        console.log('user: ', user);
        this.logUs = user;
        return user;
      })

      .catch(err => {
        this.logUs = null;
        if (err.status === 404) {
          console.log('Not authorized');
        } else {
          console.log(err);
        }
      });
  }

  public isAdmin(): boolean {
    return this.logUs && this.logUs.role === 'ADMIN';
  }

  public isWriter(): boolean {
    return this.logUs && (this.logUs.role === 'ADMIN' || this.logUs.role === 'WRITER');
  }

  public isAuth(): boolean {
    return this.logUs != null;
  }
}
