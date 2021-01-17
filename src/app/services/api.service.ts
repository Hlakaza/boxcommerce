import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(readonly http: HttpClient) { }


  getRates(): Observable<object> {
    const url = 'https://api.ratesapi.io/api/latest';
    return this.http.get(url).pipe(map(res => res));
  }
}
