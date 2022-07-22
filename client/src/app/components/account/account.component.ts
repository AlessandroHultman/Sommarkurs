import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSignup(event: Event): void {
    event.preventDefault();
    let signUpTab = document.querySelector('.tabs .signup-tab a');
    if (signUpTab?.classList.contains('active')) {
      return;
    } else {
      let logInTab = document.querySelector('.tabs .login-tab a');
      logInTab?.classList.remove('active');
      signUpTab?.classList.add('active');
      document.getElementById('login-tab-content')?.classList.remove('active');
      document.getElementById('signup-tab-content')?.classList.add('active');
    }
  }

  public toggleLogin(event: Event): void {
    event.preventDefault();
    let logInTab = document.querySelector('.tabs .login-tab a');
    if (logInTab?.classList.contains('active')) {
      return;
    } else {
      let signUpTab = document.querySelector('.tabs .signup-tab a');
      signUpTab?.classList.remove('active');
      logInTab?.classList.add('active');
      document.getElementById('signup-tab-content')?.classList.remove('active');
      document.getElementById('login-tab-content')?.classList.add('active');
    }
  }
}
