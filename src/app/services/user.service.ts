import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:54927/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/Login', formData);
  }

  getUserProfile() {
    // tslint:disable-next-line:prefer-const
    let tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})
    console.log(tokenHeader);
    return this.http.get(this.BaseURI + '/UserProfile',{headers: tokenHeader});
  }

  query(formData) {
    console.log(formData)
    const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})
    return this.http.post(this.BaseURI + '/UserProfile/addQuery', formData, {headers: tokenHeader} );
  }

  getQuery() {
    const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token')})
    return this.http.get(this.BaseURI + '/UserProfile/getQuery',{headers: tokenHeader});
  }
}
