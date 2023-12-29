import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LeadsReportsComponent } from './pages/leads-reports/leads-reports.component';
import { CustomerSearchComponent } from './pages/customer-search/customer-search.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'customer', component : CustomerComponent, outlet: 'content'},
      { path: 'leads-reports', component : LeadsReportsComponent, outlet: 'content'},
      { path: 'customer-search', component : CustomerSearchComponent, outlet: 'content'}
  ]},
  { path: 'login', component: LoginComponent },
  { path: '', component : LoginComponent},
];
