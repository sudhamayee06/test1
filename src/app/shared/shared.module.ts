import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { PaginationModule } from './pagination/pagination.module';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { DateTimeFormatterPipe } from './pipes/date-time-formatter.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
    imports: [
        PaginationModule,
        CommonModule,
        AngularMaterialModule
    ],
    exports: [PaginationModule, DateFormatterPipe, DialogModalComponent, YesNoPipe, DateTimeFormatterPipe, CapitalizePipe],
    declarations: [DateFormatterPipe, DialogModalComponent, YesNoPipe, DateTimeFormatterPipe, CapitalizePipe],
    entryComponents: [DialogModalComponent]
})
export class SharedModule { }
