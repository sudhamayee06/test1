import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../../../shared/models/car.model';

@Component({
    selector: 'pms-cars-tile-view',
    templateUrl: './cars-tile-view.component.html',
    styleUrls: ['./cars-tile-view.component.scss']
})
export class CarsTileViewComponent implements OnInit {
    @Input() cars: Car[] = [];
    constructor() { }

    ngOnInit() {
    }
}
