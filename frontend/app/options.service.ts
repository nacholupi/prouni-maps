import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Options {
  map: Map<string, [string]>;
}

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private API_OPTS = '/api/options/';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Options> {
    return this.http.get<Options>(this.API_OPTS);
  }

  public save(theKey: string, theItems: string[]): Observable<Options> {
    return this.http.post<Options>(this.API_OPTS, { key: theKey, items: theItems });
  }
}
