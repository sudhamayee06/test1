import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        AngularMaterialModule
    ],
    exports: [
        RouterModule,
        HttpClientModule,
        NavBarComponent
    ],
    declarations: [NavBarComponent],
    providers: [AuthService, DataService]
})
// CoreModule should be loaded once and only in AppModule, as it stores services which intended to be singletones
export class CoreModule {

    // Checks if module has already been loaded through the parent injector
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, this.constructor.name);
    }

}



