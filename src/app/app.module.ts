import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './pages/users/users.service';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from './core/module/custom-material.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
