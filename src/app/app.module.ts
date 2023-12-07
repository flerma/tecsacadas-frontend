import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersService } from './pages/users/users.service';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from './core/module/custom-material.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginService } from './pages/login/login.service';
import { GlobalHttpInterceptorService } from './core/interceptors/global-http-interceptor.service';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [
    UsersService, LoginService,
    {provide: HTTP_INTERCEPTORS,    useClass: GlobalHttpInterceptorService,    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
