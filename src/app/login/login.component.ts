import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submitMessage: string;
  username = new FormControl('');
  password = new FormControl('');
  constructor(
    private authenticationService: AuthenticationService,
    private routerService: RouterService
  ) {}

  loginSubmit() {
    const user: any = { username: this.username.value, password: this.password.value };
      if (this.username.hasError('required') || this.password.hasError('required')) {
        this.submitMessage = 'Username and Password required';
      } else {
        this.authenticationService.authenticateUser(user).subscribe(
          (data) => {
            this.authenticationService.setBearerToken(data['token']);
            this.routerService.routeToDashboard();
          },
          err => {
            if (err.status === 404) {
              this.submitMessage = err.message;
            } else {
              this.submitMessage = err.error.message;
            }
          });
      }
  }
}

