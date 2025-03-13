import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // Call the login method from AuthService to authenticate the user
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // If login is successful, navigate to VideoSelector page
        this.router.navigateByUrl('/VideoSelector');
      },
      (error) => {
        // If login fails, show error message
        this.errorMessage = error.error?.message || 'Invalid username or password';
      }
    );
  }
}
