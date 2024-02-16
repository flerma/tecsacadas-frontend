import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {

  private environmentUrlApi = environment.urlApi;

  constructor(public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = error.error;

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;

        } else if(error.code === 12) {
          errorMessage = `Erro ao conectar com o servidor!`;

        }else {
          switch (error.status) {
              case 401:      //login
                  this.router.navigateByUrl(this.environmentUrlApi + "/login");
                  break;
              case 403:     //forbidden
                  this.router.navigateByUrl("/unauthorized");
                  break;
              case 400:     //forbidden
                return throwError(() => error.error);
              case 0:     //Unknown Error
                return throwError(() => "Serviço fora do ar!");
          }
        }
        return throwError(() => errorMessage);
      })
    )
  }
}
