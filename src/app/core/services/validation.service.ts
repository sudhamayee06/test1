import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidationService {

    private static passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,20}$/;

    // RFC 2822
    // tslint:disable-next-line
    private static emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    static emailValidator(control: AbstractControl) {
        return control.value.match(ValidationService.emailRegex) ?
            null : { 'invalidEmailAddress': true };
    }

    static passwordValidator(control: AbstractControl) {
        return (control.value.match(ValidationService.passwordRegex)) ?
            null : { 'invalidPassword': true };
    }

    static passwordsMatchValidator(group: FormGroup) {
        const password = group.get('password').value;
        const confirmationPassword = group.get('passwordConfirmation').value;

        return password === confirmationPassword ?
            null : { 'mismatch': true };
    }
}
