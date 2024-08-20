import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';
import { Film } from './filmovi';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends BaseDataAccessService<Film> {
  constructor(injector: Injector) {
    super('/filmovi', injector);
  }

  getMovies({
    genreName,
    movieName,
  }: {
    genreName?: string;
    movieName?: string;
  } = {}) {
    let queryString = '?';
    if (genreName) {
      queryString += `imeZanra=${genreName}`;
    }
    if (movieName) {
      queryString += `&nazivFilma=${movieName}`;
    }
    return this.getAll(queryString);
  }

  getSingleMovie(id: number) {
    return this.getSingle('/' + id);
  }

  patchFilm(id: number, film: Partial<Film>) {
    return this.patch('/' + id, film);
  }

  addFilm(film: Film) {
    return this.post('', film);
  }
  deleteFilm(id: number) {
    return this.delete('/' + id);
  }
  getReziseri() {
    return this.getAll('/reziseri');
  }
}
