import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';


const routes: Routes = [
    { path: 'register', component: RegistrationFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationFormRoutingModule {
    static components = [RegistrationFormComponent];
}
