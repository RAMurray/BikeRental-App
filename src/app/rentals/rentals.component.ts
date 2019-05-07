import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Rental } from './rental.model';
import { Subscription } from 'rxjs';
import { RentalService } from './rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit, OnDestroy {
  rentalCollection: Rental[];
  private subscription: Subscription;
  @Input() bikeId: number;
  
  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    if(this.bikeId > 0) 
      this.rentalCollection = this.rentalService.getRentalsByBikeId(this.bikeId);
    else
      this.rentalCollection = this.rentalService.getRentals();

    this.subscription = this.rentalService.rentalsChanged.subscribe(
      (rentals: Rental[]) => {
        this.rentalCollection = rentals;
      }
    )
  }

  onEditItem(index: number) {
    console.log('Editing rental at index: ' + index);
    this.rentalService.editingRental.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
