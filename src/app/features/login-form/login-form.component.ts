import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserAuthData } from '../../shared/models/user-auth-data.model';
import { DialogModalComponent } from '../../shared/dialog-modal/dialog-modal.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'pms-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    login = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    loginForm: FormGroup;

    private readonly messages = {
        incorrectFormat: 'Login or password has an incorrect format.',
        loginFailed: 'Unable to login, please check your e-mail and password',
        OK: 'OK'
    };

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            login: this.login,
            password: this.password
        });
    }

    submit({ value, valid }: { value: UserAuthData, valid: boolean }) {
        if (this.loginForm.invalid) {
            this.showError(this.messages.incorrectFormat);
            return;
        }

        this.authService.login(value)
            .subscribe((success: boolean) => {
                if (!success) {
                    this.showError(this.messages.loginFailed);
                    return;
                }

                if (this.authService.redirectUrl) {
                    const redirectUrl = this.authService.redirectUrl;
                    this.authService.redirectUrl = '';
                    this.router.navigate([redirectUrl]);
                } else {
                    this.router.navigate(['/cars']);
                }
            },
                (err: any) => {
                    console.log(err);
                });
    }

    private showError(message: string) {
        this.dialog.open(DialogModalComponent, {
            width: '300px',
            autoFocus: true,
            disableClose: false,
            data: {
                message: message,
                confirmButtonText: this.messages.OK,
                cancelButton: false,
                headerText: 'Login failed'
            }
        });
    }
}
