import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router) {}

  takeItToHome() {
    this.router.navigate(["home"]);
  }

  logout(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}
