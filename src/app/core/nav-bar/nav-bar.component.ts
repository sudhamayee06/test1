import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogModalComponent } from '../../shared/dialog-modal/dialog-modal.component';

@Component({
    selector: 'pms-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    username = '';

    private authSubscription: Subscription;
    private readonly LOGOUT_SUCCESSFUL = `You've been successfully logged out`;

    constructor(
        private router: Router,
        private authService: AuthService,
        private snackService: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.authSubscription = this.authService.authChanged
            .subscribe((authStatus) => {
                this.isLoggedIn = authStatus;
                this.username = this.authService.currentUser;
            },
                (err: any) => console.log(err));
    }

    logIn() {
        this.router.navigate(['/login']);
    }

    register() {
        this.router.navigate(['/register']);
    }

    logOut() {
        this.authService.logout()
            .subscribe((status: boolean) => {
                this.snackService.open(this.LOGOUT_SUCCESSFUL,
                    null,
                    {
                        duration: 2500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top'
                    });

                this.router.navigate(['/cars']);
                return;
            },
                (err: any) => console.log(err));
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    reports() {
        this.dialog.open(DialogModalComponent, {
            width: '300px',
            disableClose: false,
            autoFocus: false,
            data: {
                message: 'Feature is under development. Please check later.',
                confirmButtonText: 'OK',
                cancelButton: false,
                headerText: 'Under development'
            }
        });
    }
}
