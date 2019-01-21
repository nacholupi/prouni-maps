import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  oauthID: string;
  name: string;
  role: string;
  created: Date;
  email: string;
  admin: boolean;
  writer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_LOGGEDUSER = '/auth/loggedUser';
  private API_LOGOUT = '/auth/logout';

  constructor(private http: HttpClient) {
  }

  public setUser(): Promise<void | User> {
    return this.http.get<User>(this.API_LOGGEDUSER)
      .toPromise()

      .then(user => {
        user.admin = user.role === 'ADMIN';
        user.writer = user.role === 'ADMIN' || user.role === 'WRITER';
        localStorage.setItem('loggedUser', JSON.stringify(user));
        return user;
      })

      .catch(err => {
        localStorage.setItem('loggedUser', null);
        if (err.status === 404) {
          console.log('Not authorized');
        } else {
          console.log(err);
        }
      });
  }

  public logout(): Observable<any> {
    localStorage.setItem('loggedUser', null);
    return this.http.get(this.API_LOGOUT, { responseType: 'text' });
  }
}
