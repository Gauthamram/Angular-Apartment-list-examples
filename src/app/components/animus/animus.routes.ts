import { Routes } from '@angular/router';
import { ApartmentComponent } from './apartments/apartment/apartment.component';
import { AnimusComponent } from './animus.component';

export const routes: Routes = [
    {path:'',component: AnimusComponent},
    {path:'edit/:id',component: ApartmentComponent}
]