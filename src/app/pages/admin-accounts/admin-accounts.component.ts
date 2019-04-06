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
  selectedAccount: Object;
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  deleteUser(id) {
    this.adminAuthService.deleteUser(id).subscribe((responseData) => {
      console.log(responseData);
      this.getUsers();
    }, (err) => console.log(err));
  }
  addNewAccount(f) {
    if (f.valid) {
      this.adminAuthService.addUser(f.value).subscribe((responseData) => {
        this.getUsers();
      }, (err) => console.log(err));
    } else {
      alert("Please fill all of the fields");
    }

  }

  updateAccount() {
    this.adminAuthService.updateUser(this.selectedAccount).subscribe((responseData) => {
      this.getUsers();
      this.isUpdatingAccount = false;
    }, (err) => console.log(err));

  }

  getUsers() {
    this.adminAuthService.getUsers().subscribe((users) => {
      this.users = users;

    }, (err) => console.log(err));
  }

}
