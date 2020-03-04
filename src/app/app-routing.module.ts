import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/cars' },
    { path: 'car/:id', loadChildren: 'app/features/car/car.module#CarModule' },
    { path: 'cars', loadChildren: 'app/features/cars/cars.module#CarsModule' },
    { path: '**', pathMatch: 'full', redirectTo: '/cars' }
];

@NgModule({
    imports: [RouterModule.forRoot(app_routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
