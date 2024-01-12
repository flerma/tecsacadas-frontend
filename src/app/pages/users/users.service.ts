import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  findUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
