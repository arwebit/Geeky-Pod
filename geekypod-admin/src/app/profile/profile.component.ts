import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  updateUserForm!: FormGroup;
  changePasswordForm!: FormGroup;

  userNameErr: string = '';
  fullNameErr: string = '';

  oldPasswordErr: string = '';
  newPasswordErr: string = '';
  confirmPasswordErr: string = '';

  userID: any = localStorage.getItem('user_id');
  statusCode: number = 0;
  message: string = '';
  passMessage: string = '';

  constructor(private router: Router, private userSrv: UserService) {
    this.getUserDetails();
  }

  ngOnInit(): void {
    this.profileInit();
    this.passwordInit();
  }

  profileInit() {
    this.updateUserForm = new FormGroup({
      username: new FormControl(''),
      full_name: new FormControl(''),
    });
  }

  passwordInit() {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl(''),
      new_password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  getUserDetails() {
    const data = {
      filter: {
        condition: [['user_id', '=', this.userID]],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'user_id',
      sort: -1,
    };

    this.userSrv.getUsers(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.updateUserForm = new FormGroup({
          username: new FormControl(details.username),
          full_name: new FormControl(details.full_name),
        });
      },
      (err: HttpErrorResponse) => {
        Swal.fire('Error', 'Failed to delete', 'error');
      }
    );
  }

  emptyErrors() {
    this.userNameErr = '';
    this.fullNameErr = '';
    this.message = '';
  }

  emptyPassErrors() {
    this.oldPasswordErr = '';
    this.newPasswordErr = '';
    this.confirmPasswordErr = '';
    this.passMessage = '';
  }

  updateUser() {
    this.userSrv.updateUsers(this.updateUserForm.value, this.userID).subscribe(
      (result: any) => {
        this.emptyErrors();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.userNameErr = err.error.errors.username;
        this.fullNameErr = err.error.errors.full_name;
      }
    );
  }

  updatePassword() {
    this.userSrv
      .changePassword(this.changePasswordForm.value, this.userID)
      .subscribe(
        (result: any) => {
          this.emptyPassErrors();
          this.passMessage = result.message;
          setTimeout(() => {
            this.passMessage = '';
          }, 3000);
        },
        (err: HttpErrorResponse) => {
          this.emptyPassErrors();
          this.oldPasswordErr = err.error.errors.old_password;
          this.newPasswordErr = err.error.errors.new_password;
          this.confirmPasswordErr = err.error.errors.confirm_password;
        }
      );
  }
}
