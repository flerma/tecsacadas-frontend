import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../../core/model/LoginModel';
import { LoginResponse } from './LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.urlApi;

  authenticate(login: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl+'/login/authenticate', login).pipe(
      map(response  => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  authenticate1(username: string, password: string): boolean {
    this.http.get<any>(this.apiUrl);

    if(username == 'admin' && password == 'admin'){
     return true;
    }
    return false;
 }
}
