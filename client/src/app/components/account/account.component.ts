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

  public async signupSubmit(signupForm: Object) {
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify(signupForm),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        Object.values(data.errors).forEach(error => {
          if (error !== "") {
            alert(error);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async loginSubmit(loginForm: Object) {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        Object.values(data.errors).forEach(error => {
          if (error !== "") {
            alert(error);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  public toggleSignup(event: Event): void {
    event.preventDefault();
    let signupTab = document.querySelector('.tabs .signup-tab a');
    if (signupTab?.classList.contains('active')) {
      return;
    } else {
      let loginTab = document.querySelector('.tabs .login-tab a');
      loginTab?.classList.remove('active');
      signupTab?.classList.add('active');
      document.getElementById('login-tab-content')?.classList.remove('active');
      document.getElementById('signup-tab-content')?.classList.add('active');
    }
  }

  public toggleLogin(event: Event): void {
    event.preventDefault();
    let loginTab = document.querySelector('.tabs .login-tab a');
    if (loginTab?.classList.contains('active')) {
      return;
    } else {
      let signupTab = document.querySelector('.tabs .signup-tab a');
      signupTab?.classList.remove('active');
      loginTab?.classList.add('active');
      document.getElementById('signup-tab-content')?.classList.remove('active');
      document.getElementById('login-tab-content')?.classList.add('active');
    }
  }
}
