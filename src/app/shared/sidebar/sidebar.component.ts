import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.obtenerMenu();
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuarioService.logout();
  }

  obtenerMenu() {
    this.menuItems = this.sidebarService.menu;
    // console.log(this.menuItems);

  }


}
