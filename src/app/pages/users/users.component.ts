import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-usuarios',
  template: `
    <ul>
      <li *ngFor="let usuario of usuarios">
        {{ usuario.nome }} ({{ usuario.login }})
      </li>
    </ul>
  `
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsersService) { }

  ngOnInit() {
    this.usuarioService.findUsers().subscribe(data => {
      this.usuarios = data;
    });
  }
}
