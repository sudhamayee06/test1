import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { LoginFormModule } from './features/login-form/login-form.module';
import { SharedModule } from './shared/shared.module';
import { RegistrationFormModule } from './features/registration-form/registration-form.module';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './base-url-interceptor';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AngularMaterialModule,
        LoginFormModule,
        RegistrationFormModule,
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useFactory: getBaseHref,
            deps: [PlatformLocation]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}
