import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public fetchUsers() {
    return this.http.get(`${environment.baseUrl}/Accounts/viewAllUserAccounts.php`);
  }

  public addUser(userAccountDetails:any) {
    let json = JSON.stringify(userAccountDetails);
    let params = new FormData();
    params.append('userAccountDetails', json);

    return this.http.post(`${environment.baseUrl}/Accounts/addUserAccount.php`, params);
  }
}
