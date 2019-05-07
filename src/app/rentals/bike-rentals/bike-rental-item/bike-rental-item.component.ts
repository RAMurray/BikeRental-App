import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../rental.model';

@Component({
  selector: 'app-bike-rental-item',
  templateUrl: './bike-rental-item.component.html',
  styleUrls: ['./bike-rental-item.component.css']
})
export class BikeRentalItemComponent implements OnInit {
  @Input() Rental: Rental;
  isExpanded: boolean = false;
  expandImage: string = "assets/images/expand-arrow.png";
  constructor() { }

  ngOnInit() {
  }

  onExpandItem() {
    this.isExpanded = !this.isExpanded;
  }

}
