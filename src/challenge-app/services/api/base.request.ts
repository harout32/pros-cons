import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class BaseRequest {
    protected http: HttpClient;
    protected apiUrl: string = environment.apiUrl;
    constructor(private injector: Injector) {
        this.http = this.injector.get(HttpClient);
    }
    protected get<T>(route: string): Observable<T> {
        console.log(this.apiUrl);
        return this.http.get<T>(this.apiUrl + route, {
            headers: new HttpHeaders({'content-type': 'application/json'})
        });
    }
    protected put(route) {

    }
}
