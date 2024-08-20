import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';
import { Administrator } from './Administrator';
import { Korisnik } from './Korisnik';

@Injectable()
export class UsersService extends BaseDataAccessService<
  Korisnik | Administrator
> {
  constructor(injector: Injector) {
    super('', injector);
  }

  register(data: (Korisnik | Administrator) & { isAdmin?: boolean }) {
    data.datumRodjenja = '1999-01-01';
    if (!data.isAdmin) {
      return this.post('/korisnici', data);
    } else {
      return this.post('/administratori', data);
    }
  }
}
