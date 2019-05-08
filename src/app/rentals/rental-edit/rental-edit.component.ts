import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentalService } from '../rental.service';
import { BicycleService } from '../../bicycles/bicycle.service';
import { Subscription } from 'rxjs';
import { Rental } from '../rental.model';
import { Bicycle } from '../../bicycles/bicycle.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.css']
})
export class RentalEditComponent implements OnInit, OnDestroy {
  editMode = false;
  rentalForm: FormGroup;
  sub: Subscription;
  editedRentalIndex: number;
  editedRental: Rental;
  rentedBike: Bicycle;
  rentedBikeId: number = 0;

  constructor(private datePipe: DatePipe,
              private rentalService: RentalService,
              private bikeService: BicycleService) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     this.editMode = params['id'] != null;
    //     this.bikeId = +params['BikeId'];
    //     this.initForm();
    //   }
    // ) 

    this.sub = this.rentalService.editingRental.subscribe(
      (index: number) => {
        this.editedRentalIndex = index;
        this.editMode = true;
        this.editedRental = this.rentalService.getRental(index);
        this.initForm();
      }
    )
    this.initForm();
  }

  private initForm() {
    let rentalId = this.rentalService.generateRentalId();
    let bikeId = 0;
    let rentalDate = this.datePipe.transform(new Date(), 'MMM d, y');
    let rentalDuration = 0;
    let rentalAmount = 0;
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let paymethod = '';

    if(this.editMode) {
      const rental = this.rentalService.getRental(this.editedRentalIndex);
      rentalId = rental.RentalID;
      bikeId = rental.BikeID;
      rentalDate = this.datePipe.transform(rental.RentalDate, 'MMM d, y');
      rentalDuration = rental.Duration;
      rentalAmount = rental.Amount;
      firstName = rental.FirstName;
      lastName = rental.LastName;
      phoneNumber = rental.PhoneNumber;
      paymethod = rental.Paymethod;
      if(bikeId > 0)
      {
        this.rentedBike = this.bikeService.getBicycleById(bikeId);
        this.rentedBikeId = bikeId;
      }
    }

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
    if(this.rentedBikeId > 0)
      newAmount = newDuration * this.rentedBike.UnitPrice;
    else
      newAmount = newDuration;

    this.rentalForm.controls['Amount'].setValue(newAmount);
  }

  onSubmit() {
    if(this.editMode)
      this.rentalService.updateRental(this.editedRentalIndex, this.rentalForm.value);

    this.onCancel();
  }

  onCancel() {
    this.editMode = false;;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
