import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { RegistrationFormRoutingModule } from './registration-form-routing.module';
import { ValidationService } from '../../core/services/validation.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        RegistrationFormRoutingModule,
        CommonModule,
        AngularMaterialModule
    ],
    declarations: [
        RegistrationFormComponent
    ],
    providers: [
        ValidationService
    ]
})
export class RegistrationFormModule { }
