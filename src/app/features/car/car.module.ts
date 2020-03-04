import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { CarRoutingModule } from './car-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@NgModule({
    imports: [
        CarRoutingModule,
        SharedModule,
        AngularMaterialModule,
        CommonModule,
        FormsModule
    ],
    declarations: [CarRoutingModule.components],
    providers: [DataService]
})
export class CarModule { }
