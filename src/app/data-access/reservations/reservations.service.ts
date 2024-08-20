import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';
import { Rezervacija } from './rezervacija';
import { Karta } from './karta';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService extends BaseDataAccessService<Rezervacija> {
  constructor(injector: Injector) {
    super('/rezervacije', injector);
  }

  getRezervacije({ idProjekcije }: { idProjekcije?: number }) {
    let queryString = '?';
    if (idProjekcije) {
      queryString += `idProjekcije=${idProjekcije}`;
    }
    return this.getAll(queryString);
  }
  patchRezervacija({
    idKorisnika,
    idProjekcije,
    listaKarata,
  }: {
    idKorisnika: number;
    idProjekcije: number;
    listaKarata: Karta[];
  }) {
    return this.patch('', { idKorisnika, idProjekcije, listaKarata });
  }
  addRezervacija(idProjekcije: number, listaKarata: Karta[]) {
    return this.post('', { listaKarata, idProjekcije });
  }
}
