import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bicycle } from '../bicycle.model';
import { Subscription } from 'rxjs/Subscription';
import { BicycleService } from '../bicycle.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bicycle-list',
  templateUrl: './bicycle-list.component.html',
  styleUrls: ['./bicycle-list.component.css']
})
export class BicycleListComponent implements OnInit, OnDestroy {
  bicycleCollection: Bicycle[];
  subscription: Subscription;

  constructor(private bikeService: BicycleService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.bikeService.bikesChanged.subscribe(
      (oBikes: Bicycle[]) => {
        this.bicycleCollection = oBikes;
      }
    );
    this.bicycleCollection = this.bikeService.getBicycles();
  }

  onNewBicycle() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
