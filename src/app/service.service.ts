import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get(environment.api_url)
  }

  updateBalance(account_id: string, data: {}) {
    return this.http.put(`${environment.api_url}update/balance/${account_id}`, data)
  }
}
