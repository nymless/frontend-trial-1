import { Component, Input } from '@angular/core';
import { Transactions } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-heading-card',
  templateUrl: './heading-card.component.html',
  styleUrls: ['./heading-card.component.css'],
})
export class HeadingCardComponent {
  @Input() total?: number;

  constructor() {}
}
