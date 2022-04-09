import { Component, Input, OnInit } from '@angular/core';
import { List } from './../../../services/transactions.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() list?: List;

  constructor() {}

  ngOnInit(): void {}
}
