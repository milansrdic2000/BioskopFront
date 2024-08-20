import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';
import { Projekcija } from './projekcije';

@Injectable({
  providedIn: 'root',
})
export class ProjectionsService extends BaseDataAccessService<Projekcija> {
  constructor(injector: Injector) {
    super('/projekcije', injector);
  }

  getProjekcije({
    movieName,
    future,
  }: {
    movieName?: string;
    future?: boolean;
  }) {
    let query = '?';
    if (movieName) {
      query += 'nazivFilma=' + movieName + '&';
    }
    if (future) {
      query += 'future=true';
    }
    return this.getAll(query);
  }
  getProjekcija(id: number) {
    return this.getSingle('/' + id);
  }
  deleteProjekcija(id: number) {
    return this.delete('/' + id);
  }
  patchProjekcija(projekcija: Projekcija) {
    return this.patch('/' + projekcija.id, projekcija);
  }
  addProjekcija(projekcija: Projekcija) {
    return this.post('', projekcija);
  }
}
