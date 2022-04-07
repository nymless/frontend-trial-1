import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {
  Transactions,
  TransactionsService,
} from 'src/app/services/transactions.service';

type Keys = 'Income' | 'Investments' | 'Outcome' | 'Loans';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css'],
})
export class SummaryPageComponent implements OnInit {
  types;
  total;
  totalByTypes: { [key in Keys]: number };
  tabIdByTypes;
  private transactions$: Observable<Transactions> | undefined;
  private subs: Subscription | undefined;
  transactions: Transactions | undefined;

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
    this.transactions$ = this.service.getTransactions();
    this.subs = this.transactions$.subscribe((transactions) => {
      this.transactions = transactions;
      this.total = this.getTotal(this.transactions);
      this.totalByTypes = this.getByTypes(this.transactions);
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  getTotal(transactions: Transactions) {
    return transactions.total;
  }

  getByTypes(transactions: Transactions) {
    const byTypes = {
      Income: 0,
      Investments: 0,
      Outcome: 0,
      Loans: 0,
    };
    transactions.data.forEach((transaction) => {
      if (transaction.type === 'income') byTypes.Income += 1;
      if (transaction.type === 'investment') byTypes.Investments += 1;
      if (transaction.type === 'outcome') byTypes.Outcome += 1;
      if (transaction.type === 'loan') byTypes.Loans += 1;
    });
    return byTypes;
  }
}
