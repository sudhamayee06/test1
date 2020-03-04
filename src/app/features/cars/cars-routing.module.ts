import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './cars.component';
import { CarTileComponent } from './car-tile/car-tile.component';
import { CarsTileViewComponent } from './cars-tile-view/cars-tile-view.component';
import { ViewSelectorComponent } from './view-selector/view-selector.component';
import { CarsTableViewComponent } from './cars-table-view/cars-table-view.component';

const routes: Routes = [
    { path: '', component: CarsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarsRoutingModule {
    static components = [
        CarsComponent,
        CarTileComponent,
        CarsTileViewComponent,
        ViewSelectorComponent,
        CarsTableViewComponent
    ];
}
