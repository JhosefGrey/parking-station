import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const CONTENT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => HomeComponent
    }
];
