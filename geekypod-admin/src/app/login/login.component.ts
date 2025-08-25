import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  statusCode: number = 0;
  username: string = '';
  password: string = '';
  usernameErr: string = '';
  passwordErr: string = '';
  loginErr: string = '';

  constructor(private loginSrv: LoginService, private router: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    this.loginSrv.login(this.loginForm.value).subscribe(
      (result: any) => {
        const [details] = result.rows;
        localStorage.setItem('user_id', details.user_id);
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse): void => {
        this.statusCode = err.error.statusCode;
        if (this.statusCode == 400) {
          this.usernameErr = '';
          this.passwordErr = '';
          this.loginErr = '';
          this.usernameErr = err.error.errors.username;
          this.passwordErr = err.error.errors.password;
          this.loginErr = err.error.errors.message;
        } else {
          this.usernameErr = '';
          this.passwordErr = '';
          this.loginErr = '';
          this.loginErr = err.error.message;
        }
      }
    );
  }
}
