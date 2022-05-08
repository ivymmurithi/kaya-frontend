import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnChanges {
  @Input() userName!: string;
  balance: number = 0.0;

  constructor() { }

  ngOnChanges(): void {
    console.log(this.userName)
    this.balance = parseFloat(localStorage.getItem(this.userName) || "0.0");
  }

}
