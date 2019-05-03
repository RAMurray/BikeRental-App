import { Component, OnInit } from '@angular/core';
import { Bicycle } from '../bicycle.model';
import { BicycleService } from '../bicycle.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-bicycle-detail',
  templateUrl: './bicycle-detail.component.html',
  styleUrls: ['./bicycle-detail.component.css']
})
export class BicycleDetailComponent implements OnInit {

  Bike: Bicycle;
  id: number;

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
  }

  onEditBicycle() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBicycle() {
    this.bikeService.deleteBicycle(this.id);
    this.router.navigate(['/bicycles']);
  }

}
