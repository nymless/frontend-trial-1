import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css'],
})
export class SummaryCardComponent {
  @Input() type?: string;
  @Input() total?: number;
  @Input() tabId?: number;

  constructor() {}
}
