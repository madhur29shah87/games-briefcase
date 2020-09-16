import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(protected http: HttpClient) { }

  get<T>(url, params?: {}): Observable<T>{
    return this.http.get<T>(url, params);
  }
}
