import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { PagedResults } from '../../shared/models/paged-results.model';
import { Car } from '../../shared/models/car.model';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable()
export class DataService {
    private readonly apiBaseUrl = 'api/cars';

    constructor(private http: HttpClient) { }

    takeAllCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.apiBaseUrl)
            .pipe(
                map(cars => {
                    this.calculateTotalBalances(cars);
                    return cars;
                }),
                catchError(this.handleError)
            );
    }

    takeCars(page: number, pageSize: number): Observable<PagedResults<Car[]>> {
        return this.http.get<Car[]>(
            `${this.apiBaseUrl}/page/${page * pageSize}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const cars = res.body as Car[];
                    this.calculateTotalBalances(cars);

                    return {
                        results: cars,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getCar(id: number): Observable<Car> {
        return this.http.get<Car>(this.apiBaseUrl + '/' + id)
            .pipe(
                map(car => {
                    this.calculateTotalBalances([car]);
                    return car;
                }),
                catchError(this.handleError)
            );
    }

    addCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.apiBaseUrl, car)
            .pipe(catchError(this.handleError));
    }

    updateCar(car: Car): Observable<boolean> {
        return this.http.put<ApiResponse>(this.apiBaseUrl + '/' + car.id, car)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteCar(id: number): Observable<boolean> {
        return this.http.delete<ApiResponse>(this.apiBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    private calculateTotalBalances(cars: Car[]) {
        for (const car of cars) {
            if (car && car.history) {
                let total = 0;
                for (const event of car.history) {
                    total += event.amount;
                }
                car.totalBalance = total;
            }
        }
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
