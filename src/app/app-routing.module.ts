import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from "./pages/admin-sidebar/admin-sidebar.component";
import { HomeComponent } from './pages/home/home.component';
import { AcadYearComponent } from "./pages/acad-year/acad-year.component";
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminStudentsComponent } from './pages/admin-students/admin-students.component';
import { AdminAccountsComponent } from "./pages/admin-accounts/admin-accounts.component";
import { StudentComponent } from "./pages/student/student.component";
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'admin-accounts',
    component: AdminAccountsComponent
  },
  {
    path: 'admin-students',
    component: AdminStudentsComponent
  },
  {
    path: 'acad-year/:id',
    component: AcadYearComponent
  },
  {
    path: 'student/:id',
    component: StudentComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'admin-sidebar',
    component: AdminSidebarComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: "full"
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
