import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Lists } from './../../services/transactions.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  activeTab = 0;
  types = ['Income', 'Outcome', 'Loans', 'Investments'] as const;
  tabIdByTypes = {
    Income: 0,
    Outcome: 1,
    Loans: 2,
    Investments: 3,
  } as const;
  lists?: Lists;
  private subParams?: Subscription;
  private subService?: Subscription;

  constructor(
    private service: TransactionsService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subParams = this.activateRoute.queryParams.subscribe((queryParams) => {
      this.activeTab = Number(queryParams['tab']);
    });

    this.subService = this.service
      .getTransactions$()
      .subscribe((transactions) => {
        this.lists = this.service.getListByTypes(transactions);
      });
  }

  ngOnDestroy(): void {
    if (this.subParams) this.subParams.unsubscribe();
    if (this.subService) this.subService.unsubscribe();
  }

  onClick(id: number) {
    this.activeTab = id;
  }
}
