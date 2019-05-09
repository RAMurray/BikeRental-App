import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { BicyclesComponent } from './bicycles/bicycles.component';
import { BicycleStartComponent } from './bicycles/bicycle-start/bicycle-start.component';
import { BicycleListComponent } from './bicycles/bicycle-list/bicycle-list.component';
import { BicycleEditComponent } from './bicycles/bicycle-edit/bicycle-edit.component';
import { BicycleDetailComponent } from './bicycles/bicycle-detail/bicycle-detail.component';
import { BicycleItemComponent } from './bicycles/bicycle-list/bicycle-item/bicycle-item.component';
import { BicycleService } from './bicycles/bicycle.service';
import { RentalsComponent } from './rentals/rentals.component';
import { RentalEditComponent } from './rentals/rental-edit/rental-edit.component';
import { RentalService } from './rentals/rental.service';
import { FilterPipe } from './core/filter.pipe';
import { BikeRentalsComponent } from './rentals/bike-rentals/bike-rentals.component';
import { BikeRentalItemComponent } from './rentals/bike-rentals/bike-rental-item/bike-rental-item.component';
import { BikeRentalNewComponent } from './rentals/bike-rentals/bike-rental-new/bike-rental-new.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DataStorageService } from './core/data-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BicyclesComponent,
    BicycleStartComponent,
    BicycleListComponent,
    BicycleEditComponent,
    BicycleDetailComponent,
    BicycleItemComponent,
    RentalsComponent,
    RentalEditComponent,
    FilterPipe,
    BikeRentalsComponent,
    BikeRentalItemComponent,
    BikeRentalNewComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [BicycleService,RentalService,DatePipe,DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
