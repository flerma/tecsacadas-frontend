import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://ferna3326.c35.integrator.host/usuarios';
  // private apiUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) { }

  findUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
