import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BicycleService } from '../bicycle.service';

@Component({
  selector: 'app-bicycle-edit',
  templateUrl: './bicycle-edit.component.html',
  styleUrls: ['./bicycle-edit.component.css']
})
export class BicycleEditComponent implements OnInit {

  id: number;
  editMode = false;
  bikeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private bikeService: BicycleService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    if(this.editMode)
      this.bikeService.updateBicycle(this.id, this.bikeForm.value);
    else
      this.bikeService.addBicycle(this.bikeForm.value);

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let nId = this.bikeService.generateBikeId();
    let bikeType = '';
    let unitPrice = 0;
    let imagePath = '';
    let manufacturer = '';
    let status = '';

    if(this.editMode) {
      const bike = this.bikeService.getBicycle(this.id);
      nId = bike.ID;
      bikeType = bike.BikeType;
      unitPrice = bike.UnitPrice;
      imagePath = bike.ImagePath;
      manufacturer = bike.Manufacturer;
      status = bike.Status;
    }

    this.bikeForm = new FormGroup({
      'ID': new FormControl(nId, Validators.required),
      'BikeType': new FormControl(bikeType, Validators.required),
      'UnitPrice': new FormControl(unitPrice, Validators.required),
      'ImagePath': new FormControl(imagePath, Validators.required),
      'Manufacturer': new FormControl(manufacturer, Validators.required),
      'Status': new FormControl(status, Validators.required)
    })

  }

}
