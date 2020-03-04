import { Component, OnInit } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { HistoryRecord } from '../../../shared/models/history-record.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
    selector: 'pms-car-history',
    templateUrl: './car-history.component.html',
    styleUrls: ['./car-history.component.scss']
})
export class CarHistoryComponent implements OnInit {
    car: Car;
    historyData: HistoryRecord[];

    displayedColumns = ['timestamp', 'event', 'amount'];

    constructor(private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            const id = +params['id'];
            if (id !== 0) {
                this.getCar(id);
            }
        });
    }

    getCar(id: number) {
        this.dataService.getCar(id).subscribe((car: Car) => {
            this.car = car;
            this.historyData = car.history;
        });
    }
}
