import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // A simple static username and password for demo purposes
    const validUsername = 'user';
    const validPassword = 'password';

    if (this.username === validUsername && this.password === validPassword) {
      // Simulate successful login
      alert('Login successful!');
      this.router.navigateByUrl('/VideoSelector')
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
