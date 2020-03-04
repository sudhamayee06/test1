import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Car } from '../../../shared/models/car.model';

@Component({
    selector: 'pms-cars-table-view',
    templateUrl: './cars-table-view.component.html',
    styleUrls: ['./cars-table-view.component.scss']
})
export class CarsTableViewComponent implements OnInit, OnChanges {
    @Input() cars: Car[] = [];
    dataSource: Car[];
    displayedColumns = ['model', 'type', 'address.city', 'age', 'isDamaged', 'isAvailable', 'totalBalance', 'actions'];
    constructor() { }

    ngOnInit() {
        this.dataSource = this.cars;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.cars) {
            this.dataSource = this.cars;
        }
    }

}
