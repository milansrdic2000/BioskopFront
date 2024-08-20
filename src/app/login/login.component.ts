import { Component } from '@angular/core';
import { LoginService } from '../data-access/users/login.service';
import { UsersService } from '../data-access/users/users.service';
import { CookieService } from 'ngx-cookie';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

export enum LoginState {
  LOGIN,
  REGISTER,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isAdmin: boolean = false;
  constructor(
    private loginService: LoginService,
    private usersService: UsersService,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (window.location.href.includes('admin')) {
      this.isAdmin = true;
      console.log('admin is here');
      this.email = '123';
      this.password = '123';
    }
  }
  loginState = LoginState.LOGIN;
  loginStateEnum = LoginState;

  email: string = '99';
  password: string = '99';
  imePrezime: string = 'Darko Plavusic';

  toggleLoginState() {
    this.loginState =
      this.loginState === LoginState.LOGIN
        ? LoginState.REGISTER
        : LoginState.LOGIN;
  }

  get linkText() {
    return this.loginState === LoginState.LOGIN ? 'Registruj se' : 'Prijavi se';
  }
  get buttonText() {
    return this.loginState === LoginState.LOGIN ? 'Prijavi se' : 'Registruj se';
  }
  get descriptionText() {
    return this.loginState === LoginState.LOGIN
      ? 'Nemate nalog?'
      : 'Već imate nalog?';
  }
  get isRegister() {
    return this.loginState === LoginState.REGISTER;
  }

  loginRegister() {
    if (this.loginState === LoginState.LOGIN) {
      this.loginService
        .login({
          email: this.email,
          sifra: this.password,
          isAdmin: this.isAdmin,
        })
        .subscribe((res) => {
          const accessToken = res['accessToken'];
          if (accessToken) {
            this.cookieService.put('accessToken', accessToken);

            this.authService.setUser(res['user']);
          }

          this.router.navigate([this.isAdmin ? '/admin' : '/filmovi']);
        });
    } else {
      const [ime, prezime] = this.imePrezime.split(' ');
      this.usersService
        .register({
          email: this.email,
          sifra: this.password,
          ime,
          prezime,
          isAdmin: false,
        })
        .subscribe((res) => {
          this.toggleLoginState();
        });
    }
  }
}
