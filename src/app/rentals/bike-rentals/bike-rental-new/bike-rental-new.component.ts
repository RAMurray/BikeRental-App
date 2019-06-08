import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Rental } from '../../rental.model';
import { DatePipe } from '@angular/common';
import { RentalService } from '../../rental.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Bicycle } from '../../../bicycles/bicycle.model';
import { BicycleService } from '../../../bicycles/bicycle.service';

@Component({
  selector: 'app-bike-rental-new',
  templateUrl: './bike-rental-new.component.html',
  styleUrls: ['./bike-rental-new.component.css']
})
export class BikeRentalNewComponent implements OnInit {
  Bike: Bicycle;
  rentalForm: FormGroup;
  sub: Subscription;
  editedRentalIndex: number;
  editedRental: Rental;
  bikeIndex: number;

  constructor(private datePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute,
              private bikeService: BicycleService,
              private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const index: number = +params['id'];
        this.bikeIndex = index;
        this.Bike = this.bikeService.getBicycle(index);
        this.initForm();
      }
    )
  }
  

  private initForm() {
    let rentalId = this.rentalService.generateRentalId();
    let bikeId = this.Bike.ID;
    let rentalDate = Date.now.toString(); //this.datePipe.transform(new , 'MMM d, y');
    let rentalDuration = 0;
    let rentalAmount = 0;
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let paymethod = '';

    this.rentalForm = new FormGroup({
      'RentalID': new FormControl(rentalId, Validators.required),
      'BikeID': new FormControl(bikeId, Validators.required),
      'RentalDate': new FormControl(rentalDate, Validators.required),
      'Duration': new FormControl(rentalDuration, [Validators.required, Validators.pattern(/^[1-9]$/)]),
      'Amount': new FormControl(rentalAmount, Validators.required),
      'FirstName': new FormControl(firstName, Validators.required),
      'LastName': new FormControl(lastName, Validators.required),
      'PhoneNumber': new FormControl(phoneNumber, Validators.required),
      'Paymethod': new FormControl(paymethod, Validators.required)
    })
  }

  // Recalcualte the amount of the rental
  onDurationChanged(newDuration) {
    let newAmount = 0;
    newAmount = newDuration * this.Bike.UnitPrice;

    this.rentalForm.controls['Amount'].setValue(newAmount);
  }

  onSubmit() {
    console.log(this.rentalForm.value);
    const sRentalDate: string = this.rentalForm.value['RentalDate'].year + '-' + this.rentalForm.value['RentalDate'].month + '-' + this.rentalForm.value['RentalDate'].day;
    console.log('Rental Date day:' + sRentalDate);
    this.rentalForm.value['RentalDate'] = sRentalDate;
    this.rentalService.addRental(this.rentalForm.value);

    // Change Bike's status
    this.Bike.Status = "Rented";
    this.bikeService.updateBicycle(this.bikeIndex, this.Bike);

    this.onCancel();
  }

  onCancel() {
    this.bikeService.newBikeRental.next(false);
  }

}
