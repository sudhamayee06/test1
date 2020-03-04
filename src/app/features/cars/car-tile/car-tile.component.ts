import { Component, Input } from '@angular/core';
import { Car } from '../../../shared/models/car.model';
import { Router } from '@angular/router';

@Component({
    selector: 'pms-car-tile',
    templateUrl: './car-tile.component.html',
    styleUrls: ['./car-tile.component.scss']
})
export class CarTileComponent {
    @Input() car: Car;

    constructor(private router: Router) { }

    onEdit() {
        this.router.navigate(['/car', this.car.id, 'edit']);
    }

    onDetails() {
        this.router.navigate(['/car', this.car.id, 'details']);
    }
}
