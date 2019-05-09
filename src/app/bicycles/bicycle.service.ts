import { Injectable } from '@angular/core';
import { Bicycle } from './bicycle.model';
import { Subject } from 'rxjs';
import { RentalService } from '../rentals/rental.service';

@Injectable()
export class BicycleService {
  bikesChanged =  new Subject<Bicycle[]>();
  newBikeRental = new Subject<boolean>(); 
  private bikeCollection: Bicycle[] = [
    new Bicycle(1000, 'Hybrid', 18, 'assets/images/Hybrid.jpg', "Marin", "Available"),
    new Bicycle(1001, 'Cruiser', 18, 'assets/images/Cruiser.jpg', "360 Bicycles", "Available"),
    new Bicycle(1002, 'Mountain', 25, 'assets/images/Mountain.jpg', "DiamondBack", "Available"),
    new Bicycle(1003, 'Road', 25, 'assets/images/Road.jpg', "Specialized", "Available"),
    new Bicycle(1004, 'Tandem', 24, 'assets/images/Tandem.jpg', "Raleigh", "Available")
  ];

  constructor() {}

  setBicycles(bikes: Bicycle[]) {
      this.bikeCollection = bikes;
      this.bikesChanged.next(this.bikeCollection.slice()); 
  }

  getBicycles() {
      return this.bikeCollection.slice();
  }

  getBicycle(index: number) {
      return this.bikeCollection[index];
  }

  getBicycleById(bikeId: number) {
    for(let bike of this.bikeCollection ) {
      if(bike.ID == bikeId)
        return bike;
    }
  }

  addBicycle(bike: Bicycle) {
      this.bikeCollection.push(bike);
      this.bikesChanged.next(this.bikeCollection.slice());
  }

  updateBicycle(index: number, newBike: Bicycle) {
      this.bikeCollection[index] = newBike;
      this.bikesChanged.next(this.bikeCollection.slice());
  }

  deleteBicycle(index: number) {
      this.bikeCollection.splice(index, 1);
      this.bikesChanged.next(this.bikeCollection.slice());
  }

  generateBikeId() {
    let lastBike: Bicycle;  
    lastBike = this.bikeCollection[this.bikeCollection.length -1];
    return lastBike.ID + 1;
  }

}
