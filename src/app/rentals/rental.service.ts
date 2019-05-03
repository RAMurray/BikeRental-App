import { Injectable } from '@angular/core';
import { Rental } from './rental.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RentalService {
  rentalsChanged = new Subject<Rental[]>();
  private rentalCollection: Rental[] = [
    new Rental(1000, '2019-04-15', 3),
    new Rental(1001, '2019-04-15', 2),
    new Rental(1002, '2019-04-16', 2),
    new Rental(1002, '2019-04-17', 4)
  ];

  constructor() { }

  setRentals(rentals: Rental[]) {
    this.rentalCollection = rentals;
    this.rentalsChanged.next(this.rentalCollection.slice()); 
  }

  getRentals() {
    return this.rentalCollection.slice();
  }

  getRental(index: number) {
    return this.rentalCollection[index];
  }

  getRentalsByBikeId(bikeId: number) {  
    let bikeRentals: Rental[];
    for(let rental of this.rentalCollection ) {
      if(rental.BikeID == bikeId)
        bikeRentals.push(rental);
    }
    return bikeRentals;
  }

  addRental(rental: Rental) {
    this.rentalCollection.push(rental);
    this.rentalsChanged.next(this.rentalCollection.slice());
  }

  addRentalToBike(rental: Rental, bikeId: number) {
    this.rentalCollection.push(rental);
    let bikeRentals: Rental[];
    bikeRentals = this.getRentalsByBikeId(bikeId);
    this.rentalsChanged.next(bikeRentals.slice());
  }

  updateRental(index: number, newRental: Rental) {
    this.rentalCollection[index] = newRental;
    this.rentalsChanged.next(this.rentalCollection.slice());
  }

  deleteRental(index: number) {
    this.rentalCollection.splice(index, 1);
    this.rentalsChanged.next(this.rentalCollection.slice());
  }

}
