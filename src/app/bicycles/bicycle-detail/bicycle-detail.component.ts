import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bicycle } from '../bicycle.model';
import { BicycleService } from '../bicycle.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bicycle-detail',
  templateUrl: './bicycle-detail.component.html',
  styleUrls: ['./bicycle-detail.component.css']
})
export class BicycleDetailComponent implements OnInit {
  Bike: Bicycle;
  id: number;
  newBikeRental: boolean = false;

  constructor(private bikeService: BicycleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.Bike = this.bikeService.getBicycle(this.id);
      }
    )
    this.bikeService.newBikeRental.subscribe(
      (addingRental: boolean) => {
        console.log('Subscription: Is adding Rental:' + addingRental);
        if(addingRental)
          this.newBikeRental = true;
        else
          this.newBikeRental = false;
      }
    )
  }

  onEditBicycle() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBicycle() {
    this.bikeService.deleteBicycle(this.id);
    this.router.navigate(['/bicycles']);
  }

  onNewBikeRental() {
    this.newBikeRental = !this.newBikeRental;
  }
  
  getStatusClasses(status: string) {
    return {
      'badge-success': status === 'Available',
      'badge-warning': status === 'Rented',
      'badge-danger': status === 'Maintenance'
    };
  }

}
