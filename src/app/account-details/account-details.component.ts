import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnChanges, OnInit {
  @Input() userName!: string;
  @Input() userID!: string;

  balance: number = 0.0;
  actionName!: string;
  accounts: any[] = [];
  transferto!: any;
  listOfTransactions: any;
  public error: string = '';

  constructor(
    private service: ServiceService) { }

  ngOnInit(): void {
    this.getUsernames()
    this.getTransactions()
  }

  ngOnChanges(): void {
    this.balance = parseFloat(localStorage.getItem(this.userName) || "0.0");
  }

  setClickName(actionName: string) {
    this.actionName = actionName;
  }

  action(amount: string) {
    let data = {
      amount: amount,
      action: this.actionName
    }

  if(this.actionName == "WITHDRAW"){
    if(this.balance < parseFloat(amount)) {
      this.error = 'Insufficient Funds'
        setTimeout(() => {
          this.error = ''
        }, 1700);
          return;
    }
  }

  this.service.updateBalance(this.userID, data)
    .subscribe((result: any) => {
      if(this.actionName == "WITHDRAW")
      {
        this.balance -= parseFloat(amount);
      } else {
        this.balance += parseFloat(amount); 
      }
      localStorage.setItem(this.userName, `${this.balance + parseFloat(amount)}`);
    })
  }

  getUsernames(){
    this.service.getAccounts()
    .subscribe((usernames:any) => {
      this.accounts = usernames;
    })
  }

  transfer(transferamount:string) {
    if(this.balance < parseFloat(transferamount)){
      this.error = 'Insufficient Funds'
      setTimeout(() => {
        this.error = ''
      }, 1700);
      return;
    }
    let data = {
      amount: transferamount,
      action: this.actionName,
      target_id: this.transferto,
    }
    this.service.updateBalance(this.userID, data)
    .subscribe((result) => {
      this.balance -= parseFloat(transferamount);
      localStorage.setItem(this.userName, `${this.balance - parseFloat(transferamount)}`);
      window.location.reload()
    });
  }

  getTransactions() {
    this.service.getTransactions()
    .subscribe((results:any) => {
      this.listOfTransactions = results
    })
  }

}
