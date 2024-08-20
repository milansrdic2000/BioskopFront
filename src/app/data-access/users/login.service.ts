import { Injectable, Injector } from '@angular/core';
import { BASE_PATH, BaseDataAccessService } from '../base-data-access.service';
import { Administrator } from './Administrator';
import { Korisnik } from './Korisnik';

@Injectable()
export class LoginService extends BaseDataAccessService<
  Korisnik | Administrator
> {
  constructor(injector: Injector) {
    super('/login', injector);
  }

  login(data: { email: string; sifra: string; isAdmin?: boolean }) {
    return this.post('', data);
  }
}
