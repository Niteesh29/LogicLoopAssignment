import { Routes } from '@angular/router';
import { ContactComponent } from '../components/contact/contact.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', component:DashboardComponent
    },
    {
        path: 'contact', component:ContactComponent
    }
];
