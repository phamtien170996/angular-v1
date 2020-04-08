import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

const DEMO_PARAMS = {
  EMAIL: 'admin@demo.com',
  PASSWORD: 'demo'
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
		private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      'username': ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
    });
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username').invalid) {
          return 'Username invalid';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').invalid) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }

  onSubmit(post) {
    // this.post = post;
    this.router.navigateByUrl('/dashboard')
  }

  onRegister() {
    console.log('sdfsdfds');
  }
}
