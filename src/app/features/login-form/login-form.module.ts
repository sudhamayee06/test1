import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormRoutingModule } from './login-form-routing.module';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material.module';
import { AuthService } from '../../core/services/auth.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        LoginFormRoutingModule,
        CommonModule,
        AngularMaterialModule
    ],
    declarations: [LoginFormRoutingModule.components]
})
export class LoginFormModule { }
