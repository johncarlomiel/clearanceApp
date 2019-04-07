import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {
  users: Array<any>
  isAddingAccount = false;
  isUpdatingAccount = false;
  isModalLoading = false;
  p = 1;
  selectedAccount: { username: string, type: string, pwd: string, user_id: number };
  isLoading = false;
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  deleteUser(id) {
    this.isLoading = true;
    this.adminAuthService.deleteUser(id).subscribe((responseData) => {
      console.log(responseData);
      this.users = responseData;
      this.isLoading = false;
    }, (err) => console.log(err));
  }
  addNewAccount(f) {
    this.isModalLoading = true;
    f.value["type"] = "admin";
    if (f.valid) {
      this.adminAuthService.addUser(f.value).subscribe((responseData) => {
        this.users = responseData;
        this.isAddingAccount = false;
        this.isModalLoading = false;
      }, (err) => {
        alert("Duplication of username found please change the username");
        this.isModalLoading = false;
      });
    } else {
      alert("Please fill all of the fields");
    }

  }

  updateAccount() {
    this.isModalLoading = true;
    this.selectedAccount.type = "admin";
    this.adminAuthService.updateUser(this.selectedAccount).subscribe((responseData) => {
      this.users = responseData;
      this.isUpdatingAccount = false;
      this.isModalLoading = false;
    }, (err) => {
      alert("Duplication of username found please change the username");
      this.isModalLoading = false;
    });

  }

  getUsers() {
    this.isLoading = true;
    this.adminAuthService.getUsers().subscribe((users) => {
      this.isLoading = false;
      this.users = users;

    }, (err) => console.log(err));
  }

}
