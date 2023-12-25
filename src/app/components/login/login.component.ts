import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginData = {
    documentNumber: '',
    password: '',
    documentType: 'cc',
  };
  constructor(private authService: AuthService, private router: Router) { }


  onLogin() {
    this.authService.login(this.loginData.documentNumber, this.loginData.password, this.loginData.documentType).subscribe(
      (user) => {
        if (user && user.token) {
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('u64w3', user.firstname + " " + user.surname);
          this.router.navigate(['/product'])
        } else {
          console.error('Login failed: Invalid credentials or other error');
        }
      },
      (error) => {
        console.error('Login failed: An error occurred', error);
      }
    );
  }
}
