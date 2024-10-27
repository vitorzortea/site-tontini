import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./page/home/home.component').then(mod=>mod.HomeComponent),
    }
];
