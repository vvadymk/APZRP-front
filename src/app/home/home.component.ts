import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  queryHistory;

  formModel = {
    Arab: 2,
  };

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
    this.service.getQuery().subscribe(
      res => {
        this.queryHistory = res;
        console.log(this.queryHistory[1].arab)
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onSubmit(form: NgForm) {
    this.service.query(form.value).subscribe(
      (res: any) => {
        this.router.navigate(['home']);
        window.location.reload();
      },
      err => {
        if (err.status == 400)
          console.log('a');
        else
          console.log(err);
      }
    );
  }
}
