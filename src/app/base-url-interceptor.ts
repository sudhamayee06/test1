import { APP_BASE_HREF } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(
        @Inject(APP_BASE_HREF) private baseHref: string) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const apiReq = request.clone({ url: `${this.baseHref}${request.url}` });
        return next.handle(apiReq);
    }
}
