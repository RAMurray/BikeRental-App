import { Component, OnInit, Input } from '@angular/core';
import { Bicycle } from '../../bicycle.model';

@Component({
  selector: 'app-bicycle-item',
  templateUrl: './bicycle-item.component.html',
  styleUrls: ['./bicycle-item.component.css']
})
export class BicycleItemComponent implements OnInit {
  @Input() Bike: Bicycle;
  @Input() index: number;
  
  getStatusClasses(status: string) {
    return {
      'list-group-item-warning': status === 'Rented',
      'list-group-item-danger': status === 'Maintenance'
    };
  }

  constructor() { }

  ngOnInit() {
  }

}
