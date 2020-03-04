import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsComponent } from './cars.component';
import { NO_ERRORS_SCHEMA, Component, Input, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { FilterService } from '../../core/services/filter.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Car } from '../../shared/models/car.model';
import { PagedResults } from '../../shared/models/paged-results.model';
import { PageEvent } from '@angular/material';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from '../../angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';

describe('Cars Component', () => {
    let component: CarsComponent;
    let fixture: ComponentFixture<CarsComponent>;

    const carsMock = Array.apply(null, { length: 50 }).map(function (_, index) {
        return {
            id: index
        };
    }) as any as Car[];

    const pagedResultMock: PagedResults<Car[]> = {
        totalRecords: carsMock.length,
        results: carsMock
    };

    const dataServiceMock = {
        takeCars: jasmine.createSpy('takeCars').and.callFake((params) => {
            return Observable.of(pagedResultMock);
        })
    };
    const filterServiceMock = {};
    const routerMock = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AngularMaterialModule, BrowserAnimationsModule],
            declarations: [CarsComponent, PaginationMockComponent],
            providers: [
                { provide: DataService, useValue: dataServiceMock },
                { provide: FilterService, useValue: filterServiceMock },
                { provide: Router, useValue: routerMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        dataServiceMock.takeCars.calls.reset();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CarsComponent);
        component = fixture.componentInstance;
    });

    describe(' - Interaction - ', () => {
        it('Template Bindings: should pass page size to pagination component', () => {
            component.pageSize = 100;
            fixture.detectChanges();
            expect(component.pageSize).toBe(100);

            const el = fixture.debugElement.queryAll(By.css('pms-pagination'));
            expect(el.length).toBe(1);

            const paginationComponent: PaginationMockComponent = el[0].componentInstance;

            expect(paginationComponent.itemsPerPage).toBe(100);
        });

        it('Template Bindings: should pass total number of items to pagination component', () => {
            fixture.detectChanges();
            expect(component.totalRecords).toBe(carsMock.length);

            const el = fixture.debugElement.queryAll(By.css('pms-pagination'));
            expect(el.length).toBe(1);

            const paginationComponent: PaginationMockComponent = el[0].componentInstance;

            expect(paginationComponent.totalItems).toBe(carsMock.length);
        });

        it('Template Bindings: should call onPageParamsChanged() method on `pageChanges` event raised by pagination component', () => {
            spyOn(component, 'onPageParamsChanged').and.callThrough();

            const el = fixture.debugElement.queryAll(By.css('pms-pagination'));

            expect(el.length).toBe(1);

            const paginationComponent: PaginationMockComponent = el[0].componentInstance;

            const pageEventMock = {
                pageIndex: 20,
                pageSize: 40
            } as any as PageEvent;

            paginationComponent.pageParamChanged(pageEventMock);

            expect(component.onPageParamsChanged).toHaveBeenCalledTimes(1);
            expect(component.onPageParamsChanged).toHaveBeenCalledWith(pageEventMock);
        });
    });

    describe(' - Pagination - ', () => {
        it('Component: should call data service on init', () => {
            fixture.detectChanges();

            expect(dataServiceMock.takeCars).toHaveBeenCalledTimes(1);
        });

        it('Component: should request data only for the first page on init', () => {
            fixture.detectChanges();

            expect(dataServiceMock.takeCars).toHaveBeenCalledWith(0, 10);
        });

        it('Component: should keep total number of records under proper field on response received', () => {
            fixture.detectChanges();

            expect(component.totalRecords).toBe(carsMock.length);
        });

        it('Component: should store results (cars) under proper field on response received', () => {
            fixture.detectChanges();

            expect(component.cars.length).toBe(carsMock.length);
        });

        it('Component: should update filtered cars on response received', () => {
            fixture.detectChanges();

            expect(component.filteredCars.length).toBe(carsMock.length);
        });
    });

    describe(' - On Pagination parameters changed - ', () => {
        describe(' - if both page index and page size has not changed -', () => {
            it('onPageParamsChanged() should not request data if both page index and page size has not changed', () => {
                const newPageEvent = {
                    pageIndex: 0,
                    pageSize: 10
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(dataServiceMock.takeCars).toHaveBeenCalledTimes(0);
            });
        });

        describe(' - if any of pagination parameters changed - ', () => {
            it('onPageParamsChanged() should request correct data if page index has changed', () => {
                const newPageEvent = {
                    pageIndex: 1,
                    pageSize: 10
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(dataServiceMock.takeCars).toHaveBeenCalledTimes(1);
                expect(dataServiceMock.takeCars).toHaveBeenCalledWith(1, 10);
            });

            it('onPageParamsChanged() should request correct data if page size has changed', () => {
                const newPageEvent = {
                    pageIndex: 0,
                    pageSize: 20
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(dataServiceMock.takeCars).toHaveBeenCalledTimes(1);
                expect(dataServiceMock.takeCars).toHaveBeenCalledWith(0, 20);
            });

            it('onPageParamsChanged() should update stored page size value if it has changed', () => {
                expect(component.pageSize).toBe(10);

                const newPageEvent = {
                    pageIndex: 0,
                    pageSize: 20
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(component.pageSize).toBe(20);
            });

            it('onPageParamsChanged() should update stored page index value if it has changed', () => {
                expect(component['currentPageIndex']).toBe(0);

                const newPageEvent = {
                    pageIndex: 1,
                    pageSize: 10
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(component['currentPageIndex']).toBe(1);
            });

            it('onPageParamsChanged() should call clearFilter() method', () => {
                spyOn(component, 'clearFilter');

                const newPageEvent = {
                    pageIndex: 1,
                    pageSize: 10
                } as any as PageEvent;

                component.onPageParamsChanged(newPageEvent);

                expect(component.clearFilter).toHaveBeenCalledTimes(1);
            });
        });
    });
});

@Component({
    selector: 'pms-pagination',
    template: `<div class="paginator">
            <mat-paginator [length]="totalItems" [pageSize]="itemsPerPage" [pageSizeOptions]="pageSizeOptions"
                (page)="pageParamChanged($event)">
            </mat-paginator>
        </div>`
})
class PaginationMockComponent {
    @Input() totalItems: number;
    @Input() itemsPerPage: number;
    @Input() pageSizeOptions = [5, 10, 25];

    @Output() pageChanges = new EventEmitter<PageEvent>();

    constructor() { }

    pageParamChanged(params: PageEvent) {
        this.pageChanges.emit(params);
    }
}
