import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = ''; // Aquí debes obtener el nombre de usuario desde tu sistema de autenticación

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('u64w3');
    this.username = storedUsername ?? 'Usuario predeterminado';
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/'])

  }
}
