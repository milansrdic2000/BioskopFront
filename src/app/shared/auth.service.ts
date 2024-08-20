import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Korisnik } from '../data-access/users/Korisnik';
import { Administrator } from '../data-access/users/Administrator';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenName = 'accessToken'; // The name of the token stored in cookies
  private currentUser: Korisnik | Administrator;
  isAdmin: boolean;

  constructor(private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    const token = this.cookieService.get(this.tokenName);
    return !!token;
  }
  logOff() {
    this.cookieService.remove(this.tokenName);
  }
  setUser(user: Korisnik | Administrator) {
    this.currentUser = user;
    this.cookieService.put('userDetails', JSON.stringify(user));
  }
  getUser(): Korisnik | Administrator {
    return JSON.parse(this.cookieService.get('userDetails') || '{}');
  }
  // getToken(): string | null {
  //   return this.cookieService.get(this.tokenName) || null;
  // }
}
