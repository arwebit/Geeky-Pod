import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent {
  userID: any = localStorage.getItem('user_id');
  name: string = '';

  constructor(private router: Router, private userSrv: UserService) {
    this.getUserDetails();
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
        this.name = details.full_name;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
