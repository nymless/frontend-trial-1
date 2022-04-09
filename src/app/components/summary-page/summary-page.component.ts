import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {
  Transactions,
  TransactionsService,
} from 'src/app/services/transactions.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css'],
})
export class SummaryPageComponent implements OnInit {
  types;
  tabIdByTypes;
  total;
  totalByTypes;
  private subscription?: Subscription;

  constructor(private service: TransactionsService) {
    this.types = ['Income', 'Investments', 'Outcome', 'Loans'] as const;
    this.tabIdByTypes = {
      Income: 0,
      Outcome: 1,
      Loans: 2,
      Investments: 3,
    } as const;
    this.total = 0;
    this.totalByTypes = {
      Income: 0,
      Investments: 0,
      Outcome: 0,
      Loans: 0,
    };
  }

  ngOnInit(): void {
    this.subscription = this.service
      .getTransactions$()
      .subscribe((transactions) => {
        this.total = this.service.getTotal(transactions);
        this.totalByTypes = this.service.getTotalByTypes(transactions);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
