import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { BicyclesComponent } from './bicycles/bicycles.component';
import { BicycleStartComponent } from './bicycles/bicycle-start/bicycle-start.component';
import { BicycleEditComponent } from './bicycles/bicycle-edit/bicycle-edit.component';
import { BicycleDetailComponent } from './bicycles/bicycle-detail/bicycle-detail.component';
import { RentalsComponent } from './rentals/rentals.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'bikes', component: BicyclesComponent, children: [
    { path: '', component: BicycleStartComponent},
    { path: 'new', component: BicycleEditComponent},
    { path: ':id', component: BicycleDetailComponent},
    { path: ':id/edit', component: BicycleEditComponent}
  ]},
  {path:'rentals', component: RentalsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
