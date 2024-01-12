import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersService } from './pages/users/users.service';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { CustomMaterialModule } from './core/module/custom-material.module';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginService } from './pages/login/login.service';
import { GlobalHttpInterceptorService } from './core/interceptors/global-http-interceptor.service';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { LeadsReportsComponent } from './pages/leads-reports/leads-reports.component';
import { RouterModule } from '@angular/router';
import { LeadsReportsService } from './pages/leads-reports/leads-reports.service';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FileUploadComponent,
    LeadsReportsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [
    UsersService, LoginService, LeadsReportsService,
    {provide: HTTP_INTERCEPTORS,    useClass: GlobalHttpInterceptorService,    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
