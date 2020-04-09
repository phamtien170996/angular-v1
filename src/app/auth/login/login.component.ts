import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, Login } from 'src/app/core/auth';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Subject } from 'rxjs';

const DEMO_PARAMS = {
  EMAIL: 'admin@demo.com',
  PASSWORD: 'demo'
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  private unsubscribe: Subject<any>;

  private returnUrl: any;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/dashboard';
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      'email': ['', Validators.compose([
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

  ngOnDestroy(): void {
    this.loading = false;
  }

  getError(el) {
    switch (el) {
      case 'email':
        if (this.formGroup.get('email').invalid) {
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
    const authData = {
      email: post.email,
      password: post.password
    };
    this.loading = true;

    this.auth
      .login(authData.email, authData.password)
      .pipe(
        tap(user => {
          console.log(user);

          if (user) {
            this.store.dispatch(new Login({ authToken: user.accessToken }));
            this.router.navigateByUrl(this.returnUrl); // Main page
          } else {
            console.log('Login error');
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  onRegister() {
    console.log('sdfsdfds');
  }
}
