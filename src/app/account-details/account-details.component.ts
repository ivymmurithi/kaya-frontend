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

  constructor(
    private service: ServiceService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getUsernames()
    this.getTransactions()
    this.reloadComponent() 
  }

  ngOnChanges(): void {
    console.log(this.userName)
    this.balance = parseFloat(localStorage.getItem(this.userName) || "0.0");
  }

  setClickName(actionName: string) {
    this.actionName = actionName;
    console.log(this.actionName)
  }

  action(amount: string) {
    let data = {
      amount: amount,
      action: this.actionName
    }
    this.service.updateBalance(this.userID, data)
    .subscribe((result: any) => {
      console.log(result);
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
    let data = {
      amount: transferamount,
      action: this.actionName,
      target_id: this.transferto,
    }
    this.service.updateBalance(this.userID, data)
    .subscribe((result) => {
      this.balance -= parseFloat(transferamount);
      localStorage.setItem(this.userName, `${this.balance - parseFloat(transferamount)}`);
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  selected() {
    console.log(this.transferto);
  }


  getTransactions() {
    this.service.getTransactions()
    .subscribe((results:any) => {
      this.listOfTransactions = results
      console.log(this.listOfTransactions)
    })
  }

}
