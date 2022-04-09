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
  total;
  totalByTypes;
  tabIdByTypes;
  private transactions$?: Observable<Transactions>;
  private subscription?: Subscription;

  constructor(private service: TransactionsService) {
    this.types = ['Income', 'Investments', 'Outcome', 'Loans'] as const;
    this.total = 0;
    this.totalByTypes = {
      Income: 0,
      Investments: 0,
      Outcome: 0,
      Loans: 0,
    };
    this.tabIdByTypes = {
      Income: 0,
      Investments: 3,
      Outcome: 1,
      Loans: 2,
    } as const;
  }

  ngOnInit(): void {
    this.transactions$ = this.service.getTransactions$();
    this.subscription = this.transactions$.subscribe((transactions) => {
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
