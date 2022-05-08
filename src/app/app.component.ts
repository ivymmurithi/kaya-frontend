import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'kaya_challenge_frontend';
  loading = true;
  accounts: any[] = []
  accountView = false;
  accountViewUserName!: string;
  currentUserID!: string;

  constructor( private service: ServiceService) { }

  onNameClick(username: string, userID: string) {
    this.accountViewUserName = username;
    console.log(username)
    this.accountView = true;
    this.currentUserID = userID;
    console.log(this.currentUserID)
  }

  ngOnInit() {
    this.service.getAccounts()
    .subscribe((result: any) => {
      this.accounts = result;
      this.loading = false;
      for(let account_ of this.accounts){
        localStorage.setItem(`${account_.username}`, account_.balance)
      }
    })
  } 

}
