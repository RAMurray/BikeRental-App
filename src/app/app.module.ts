import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    RentalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BicycleService,RentalService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
