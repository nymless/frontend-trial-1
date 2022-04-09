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

export type List = { name: string; amount: number }[];

export interface Lists {
  Income: List;
  Investments: List;
  Outcome: List;
  Loans: List;
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
    let byTypes = {
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

  getListByTypes(transactions: Transactions) {
    let lists: Lists = {
      Income: [],
      Investments: [],
      Outcome: [],
      Loans: [],
    };
    transactions.data.forEach((transaction) => {
      let name = transaction.name.first + ' ' + transaction.name.last;
      let amount = transaction.amount;
      let addPerson = (arr: List) => arr.push({ name, amount });
      if (transaction.type === 'income') addPerson(lists.Income);
      if (transaction.type === 'investment') addPerson(lists.Investments);
      if (transaction.type === 'outcome') addPerson(lists.Outcome);
      if (transaction.type === 'loan') addPerson(lists.Loans);
    });
    return lists;
  }
}
