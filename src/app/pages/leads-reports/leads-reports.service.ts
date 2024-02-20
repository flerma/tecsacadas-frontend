import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeadReportModel } from '../../core/model/LeadReportModel';

@Injectable({
  providedIn: 'root'
})
export class LeadsReportsService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.urlApi;

  getReports(): Observable<LeadReportModel[]> {
    return this.http.get<LeadReportModel[]>(this.apiUrl+'/report/').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  generateSelectedReports(month: number, year: number, reportList: string[]): Observable<Blob[]> {
    return this.http.get<Blob[]>(this.apiUrl+'/report/generate' + '?report=' + reportList + '&year=' + year + '&month=' + month).pipe(
      catchError(this.handleError)
    );
  }

  generateSelectedReport(month: number, year: number, reportIdentifier: string): Observable<Blob> {
    return this.http.get(this.apiUrl+'/report/download' + '?identifier=' + reportIdentifier + '&year=' + year + '&month=' + month, { responseType: 'blob' });
  }
}
