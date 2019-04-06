import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isError = false;
  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    if (username != "" && password != "") {
      this.adminAuthService.login(username, password).subscribe((responseData) => {
        if (responseData.isCredentialsTrue) {
          //Login success
          this.router.navigate(["/admin-sidebar"]);


        } else {
          //Login Failed
          alert("Incorrect username or password");


        }
      }, (err) => console.log(err));
    } else {
      alert("Please fill all fields");
    }
  }

}
