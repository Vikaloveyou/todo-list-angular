import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [
    `input.ng-touched.ng-invalid {border: solid red 2px}
    input.ng-touched.ng-valid {border: solid green 2px}
    `
  ]
})
export class LoginComponent implements OnInit {

  title = 'Login Page';

  placeholderEmail: string = 'Enter your email';
  placeholderPass: string = 'Enter your password, 8 min, 12 max';

  email: string;
  password: any;
  wrongEmailPass: boolean = false;
  wrongDataBrd: boolean = false;
  cond: boolean = false;
  routingActivated: boolean = false;

  @ViewChild('submitDisabled')
  submitDisabled: ElementRef;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  submit() {
    this.email = this.userForm.controls['email'].value
    this.password = this.userForm.controls['password'].value

    if (this.email == 'testuser@todo.com' && this.password == 12345678) {
      this.routingActivated = true;
      if (this.routingActivated) {
        this.router.navigate(['todo']);
      }
    }

    if (this.email != 'testuser@todo.com' || this.password != 12345678) {
      this.submitDisabled.nativeElement.disabled = true;
      this.wrongEmailPass = true;
      this.wrongDataBrd = true;
      this.routingActivated = false;

      if (!this.routingActivated) {
        this.router.navigate(['']);
      }
    }

    setTimeout(() => {
      this.wrongEmailPass = false;
      this.wrongDataBrd = false;
    }, 2000);
  }

  userForm: FormGroup = new FormGroup({
    "email": new FormControl("", [
      Validators.required,
      Validators.pattern(/\S+@\S+\.\S+/)
    ]),
    "password": new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12)
    ])
  })
}
