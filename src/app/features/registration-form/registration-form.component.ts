import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserAuthData } from '../../shared/models/user-auth-data.model';

@Component({
    selector: 'pms-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
    registrationForm: FormGroup;
    registrationErrorMessage: string;

    private readonly messages = {
        passwordMismatchError: 'Password and confirmation password do not match',
        registrationFailed: 'Registration attempt failed, please try again later'
    };

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.registrationForm = this.createForm();
    }

    submit({ value, valid }: { value: UserAuthData, valid: boolean }) {

        if (this.hasPasswordMismatch()) {
            this.registrationErrorMessage = this.messages.passwordMismatchError;
            return;
        }

        this.authService.register(value)
            .subscribe((success: boolean) => {
                if (success) {
                    if (this.authService.redirectUrl) {
                        const redirectUrl = this.authService.redirectUrl;
                        this.authService.redirectUrl = '';
                        this.router.navigate([redirectUrl]);
                    } else {
                        this.router.navigate(['/cars']);
                    }
                } else {
                    this.registrationErrorMessage = this.messages.registrationFailed;
                }
            },
                (err: any) => {
                    console.log(err);
                });
    }

    private createForm() {
        return this.formBuilder.group({
            login: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]],
            passwordConfirmation: ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }

    private hasPasswordMismatch(): boolean {
        const password = this.registrationForm.controls['password'].value;
        const confirmationPassword = this.registrationForm.controls['passwordConfirmation'].value;

        return password !== confirmationPassword;
    }
}
