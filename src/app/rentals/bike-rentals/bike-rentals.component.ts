import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rental } from '../rental.model';
import { RentalService } from '../rental.service';

@Component({
  selector: 'app-bike-rentals',
  templateUrl: './bike-rentals.component.html',
  styleUrls: ['./bike-rentals.component.css']
})
export class BikeRentalsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() BikeId: number;
  sub: Subscription;
  bikeRentals: Rental[];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.sub = this.rentalService.rentalsChanged.subscribe(
      (oRentals: Rental[]) => {
        this.bikeRentals= oRentals;
      }
    );
    this.bikeRentals = this.rentalService.getRentalsByBikeId(this.BikeId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnChanges() {
    this.bikeRentals = this.rentalService.getRentalsByBikeId(this.BikeId);
  }
}
