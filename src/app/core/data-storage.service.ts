import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BicycleService } from '../bicycles/bicycle.service';
import { RentalService } from '../rentals/rental.service';
import { Bicycle } from '../bicycles/bicycle.model';
import { Rental } from '../rentals/rental.model';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  bikesData: Observable<Bicycle[]>;
  constructor(private http: HttpClient, private bikeService: BicycleService, private rentalService: RentalService) { }

  storeAppData() {
    this.http.put('https://bike-rental-app-f7ef7.firebaseio.com/bicycles.json', this.bikeService.getBicycles()).subscribe(
      (response: Response) => {
        console.log(response);
      }
    );

    this.http.put('https://bike-rental-app-f7ef7.firebaseio.com/rentals.json', this.rentalService.getRentals()).subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  getAppData() {
    this.getBicyclesData();
    this.getRentalsData();
  }

  getBicyclesData() {
    this.http.get<Bicycle[]>('https://bike-rental-app-f7ef7.firebaseio.com/bicycles.json')
    .pipe(map(
      (bikeCollection) => {
        return bikeCollection;
      }
    ), catchError(error => {
      return Observable.throw("Unable to load Bicycle data.");
    }))
    .subscribe(
      (bikeCollection: Bicycle[]) => {
        this.bikeService.setBicycles(bikeCollection);
    });
  }

  getRentalsData() {
    this.http.get<Rental[]>('https://bike-rental-app-f7ef7.firebaseio.com/rentals.json')
    .pipe(map(
      (rentalCollection) => {
        return rentalCollection;
      }
    ), catchError(error => {
      return Observable.throw("Unable to load Rental data.");
    }))
    .subscribe(
      (rentalCollection: Rental[]) => {
        this.rentalService.setRentals(rentalCollection);
    });
  }

}
