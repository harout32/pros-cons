import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

export class BaseRequest {
    protected http: HttpClient;
    protected apiUrl: string = environment.apiUrl;
    protected message: NzMessageService;
    constructor(private injector: Injector) {
        this.http = this.injector.get(HttpClient);
        this.message = this.injector.get(NzMessageService);
    }

    protected get<T>(route: string): Observable<T> {
        return this.http.get<T>(this.apiUrl + route, {
            headers: new HttpHeaders({'content-type': 'application/json'})
        }).pipe(catchError(err => this.catchErrors(err)));
    }

    protected put<T>(route: string, data: any): Observable<T> {
        return this.http.put<T>(this.apiUrl + route, data, {
            headers: new HttpHeaders({'content-type': 'application/json'})
        }).pipe(catchError(err => this.catchErrors(err)));
    }
    // default error handler
    private catchErrors(err) {
        this.message.create('error', err.message);
        return throwError(err);
    }
}
