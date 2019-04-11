import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SuiModule } from 'ng2-semantic-ui';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminSidebarComponent } from './pages/admin-sidebar/admin-sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AcadYearComponent } from './pages/acad-year/acad-year.component';
import { AdminStudentsComponent } from './pages/admin-students/admin-students.component';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';
import { AcadStudentsComponent } from './pages/acad-students/acad-students.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminAccountsComponent } from './pages/admin-accounts/admin-accounts.component';
import { StudentComponent } from './pages/student/student.component';
import { MenuComponent } from './pages/menu/menu.component';

import { httpInterceptorProviders } from "./http-interceptors/index";


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HomeComponent,
    AdminSidebarComponent,
    AcadYearComponent,
    AdminStudentsComponent,
    AdminEventsComponent,
    AcadStudentsComponent,
    AdminLoginComponent,
    AdminAccountsComponent,
    StudentComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
