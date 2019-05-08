import { Injectable } from '@angular/core';
import { Rental } from './rental.model';
import { Subject } from 'rxjs';
import { BicycleService } from '../bicycles/bicycle.service';

@Injectable()
export class RentalService {
  rentalsChanged = new Subject<Rental[]>();
  editingRental = new Subject<number>();

  private rentalCollection: Rental[] = [
    new Rental(1000, 1000, '2019-04-15', 3, 45, 'Kyle', 'Davis', '555-228-4521', 'CreditCard'),
    new Rental(1001, 1001, '2019-04-15', 2, 30, 'Karen', 'Taylor', '555-555-8243', 'Cash'),
    new Rental(1002, 1002, '2019-04-16', 2, 30, 'Jerry', 'Hut', '555-111-2033', 'DebitCard'),
    new Rental(1003, 1002, '2019-04-17', 4, 60, 'Hubert', 'Kemp', '555-777-6066', 'CreditCard')
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
    const bikeRentals: Rental[] = [];
    let arrRentals: Rental[] = this.rentalCollection.slice();
    for(let rental of arrRentals ) {
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

  generateRentalId() {
    let lastRental: Rental;  
    lastRental = this.rentalCollection[this.rentalCollection.length -1];
    return lastRental.RentalID + 1;
  }

}
