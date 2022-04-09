import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Transaction {
  _id: string;
  amount: number;
  type: 'income' | 'outcome' | 'loan' | 'investment';
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface Transactions {
  total: number;
  data: Transaction[];
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions$() {
    return this.http.get<Transactions>('assets/transactions.json');
  }

  getTotal(transactions: Transactions) {
    return transactions.total;
  }

  getTotalByTypes(transactions: Transactions) {
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
