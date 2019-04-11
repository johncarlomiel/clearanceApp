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
  isLoading = false;
  constructor(private adminAuthService: AdminAuthService, private router: Router) { }

  ngOnInit() {
  }

  login(username, password) {
    this.isLoading = true;
    if (username != "" && password != "") {
      this.adminAuthService.login(username, password).subscribe((responseData) => {
        this.isLoading = false;
        this.router.navigate(["/admin-dashboard"]);
        localStorage.setItem("token", "Bearer " + responseData.jwt);

      }, (err) => console.log(err));
    } else {
      alert("Please fill all fields");
    }
  }

}
