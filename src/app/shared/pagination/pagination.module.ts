import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialModule
    ],
    exports: [PaginationComponent],
    declarations: [PaginationComponent]
})
export class PaginationModule { }
