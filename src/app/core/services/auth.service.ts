import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { UserAuthData } from '../../shared/models/user-auth-data.model';

@Injectable()
export class AuthService {
    private readonly authUrl = 'api/auth';
    private isAuthenticated = false;
    private username = '';

    redirectUrl: string;

    @Output() authChanged = new EventEmitter<boolean>();

    get currentUser() {
        return this.username;
    }

    get userAuthenticated() {
        return this.isAuthenticated;
    }

    constructor(private http: HttpClient) { }

    login(userData: UserAuthData): Observable<boolean> {
        return this.http.post<boolean>(this.authUrl + '/login', userData)
            .pipe(
                map(isLoggedIn => {
                    this.updateAuthState(isLoggedIn, userData.login);
                    this.userAuthChanged(this.isAuthenticated);

                    return this.isAuthenticated;
                }),
                catchError(this.handleError)
            );
    }

    register(userData: UserAuthData): Observable<boolean> {
        return this.http.post<boolean>(this.authUrl + '/register', userData)
            .pipe(
                map(isRegistered => {
                    this.updateAuthState(isRegistered, userData.login);
                    this.userAuthChanged(this.isAuthenticated);

                    return this.isAuthenticated;
                }),
                catchError(this.handleError)
            );
    }

    logout(): Observable<boolean> {
        return this.http.post<boolean>(this.authUrl + '/logout', null)
            .pipe(
                map(isLoggedOut => {
                    this.updateAuthState(!isLoggedOut, '');
                    this.userAuthChanged(!isLoggedOut);

                    return isLoggedOut;
                }),
                catchError(this.handleError)
            );
    }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status);
    }

    private updateAuthState(isAuthenticated: boolean, username: string) {
        this.username = username;
        this.isAuthenticated = isAuthenticated;
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Server error');
    }
}
