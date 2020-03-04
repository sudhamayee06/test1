import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Car } from '../../shared/models/car.model';
import { ViewMode } from './view-mode.enum';
import { FilterService } from '../../core/services/filter.service';
import { PagedResults } from '../../shared/models/paged-results.model';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';

/*
    To make pagination work, you'd need to implement 2 methods:
    1) `getCarsPage()`;
    2) `onPageParamsChanged()`.
*/

@Component({
    selector: 'pms-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

    selectedViewMode: ViewMode = ViewMode.Tile;
    viewMode = ViewMode;
    cars: Car[] = [];
    filteredCars: Car[] = [];

    totalRecords: number;
    pageSize = 10;

    searchString = '';

    private currentPageIndex = 0;

    constructor(
        private dataService: DataService,
        private filterService: FilterService,
        private router: Router) { }

    ngOnInit() {
        this.getCarsPage(this.currentPageIndex);
    }

    /*
        This method should:
        1) call takeCars() method of dataService, passing correct prameters (current page index and page size);
        2) handle response of type PagedResult<Car>, by keeping totalRecords and cars (assign them to local variables);
        3) to make it work alongside with filtering, consider updating filteredCars value as well.
    */
    getCarsPage(page: number) {
        this.dataService.takeCars(page, this.pageSize)
            .subscribe((response: PagedResults<Car[]>) => {
                this.cars = response.results;
                this.filteredCars = response.results;
                this.totalRecords = response.totalRecords;
            },
                (err: any) => { console.log(err); });
    }

    /*
        This method should:
        1) do nothing if neither page size nor page index changed;
        2) if page size or page index changed, it should:
            - update current page index;
            - update current page size;
            - request new set of paged data by calling getCarsPage() with correct parameter;
            - clear filtering results by calling clearFilter() method.
    */
    onPageParamsChanged(params: PageEvent) {
        if (this.pageSize !== params.pageSize || this.currentPageIndex !== params.pageIndex) {
            this.pageSize = params.pageSize;
            this.currentPageIndex = params.pageIndex;
            this.getCarsPage(params.pageIndex);
            this.clearFilter();
        }
    }

    applyFilter() {
        if (!this.searchString) {
            this.filteredCars = this.cars;
            return;
        }
        const filterBy = this.searchString.toUpperCase();
        const propsToFilterBy = ['model', 'type', 'address.city'];
        this.filteredCars = this.filterService.filter<Car>(this.cars, filterBy, propsToFilterBy);
    }

    changeViewMode(newMode: any) {
        this.selectedViewMode = newMode;
    }

    clearFilter(): any {
        this.searchString = '';
        this.applyFilter();
    }

    addNewCar() {
        this.router.navigate(['/car/0/edit']);
    }
}

