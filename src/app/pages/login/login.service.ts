import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../../core/model/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.urlApi;

  authenticate(login: LoginModel): Observable<boolean> {
    return this.http.post<Boolean>(this.apiUrl+'/login/autenticar', login).pipe(
      map(response  => {
        return typeof response === 'boolean' ? response : false;
      }),
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
