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
  
  constructor() { }

  ngOnInit() {
  }

}
