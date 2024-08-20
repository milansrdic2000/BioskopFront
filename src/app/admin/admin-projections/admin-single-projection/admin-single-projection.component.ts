import { Component } from '@angular/core';
import {
  Projekcija,
  TipProjekcije,
} from '../../../data-access/projections/projekcije';
import { ProjectionsService } from '../../../data-access/projections/projections.service';
import { ActivatedRoute } from '@angular/router';
import {
  dateToDateTimeString,
  dateToString,
} from '../../../shared/utils/date-util';
import { Film } from '../../../data-access/movies/filmovi';
import { MoviesService } from '../../../data-access/movies/movies.service';
import { Sala } from '../../../data-access/halls/sale';
import { forkJoin } from 'rxjs';
import { HallsService } from '../../../data-access/halls/halls.service';
import { CrudMode } from '../../../data-access/halls/sediste';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-single-projection',
  templateUrl: './admin-single-projection.component.html',
  styleUrl: './admin-single-projection.component.scss',
})
export class AdminSingleProjectionComponent {
  projekcija: Projekcija = {};

  datumProjekcije: string = '';

  filmSearchTerm: string = '';
  filmovi: Film[] = [];
  selectedFilm: Film | undefined;

  salaSearchTerm: string = '';
  sale: Sala[] = [];
  selectedSala: Sala | undefined;

  crudFormMode: CrudMode = CrudMode.ADD;
  constructor(
    private projectionService: ProjectionsService,
    private movieService: MoviesService,
    private hallsService: HallsService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      forkJoin({
        movies: this.movieService.getMovies(),
        halls: hallsService.getAllSale({}),
      }).subscribe(({ movies, halls }) => {
        this.filmovi = movies;
        this.sale = halls;

        this.selectedFilm = this.filmovi[0];
        this.selectedSala = this.sale[0];

        if (id === 'novi') {
          this.projekcija = {};
          this.datumProjekcije = dateToString(new Date());
          this.crudFormMode = CrudMode.ADD;
          return;
        }

        this.projectionService
          .getProjekcija(params.id)
          .subscribe((projekcija) => {
            this.crudFormMode = CrudMode.UPDATE;
            this.projekcija = projekcija;
            this.datumProjekcije = dateToDateTimeString(
              new Date(projekcija.datumProjekcije!)
            );
            this.selectedFilm = this.filmovi.find(
              (film) => film.id === projekcija.filmId
            );
            this.selectedSala = this.sale.find(
              (sala) => sala.id === projekcija.salaId
            );
          });
      });
    });
  }

  onFilmSearch(event: string) {
    this.filmSearchTerm = event;
    this.movieService
      .getMovies({ movieName: this.filmSearchTerm })
      .subscribe((filmovi) => {
        this.filmovi = filmovi;
        this.selectedFilm = this.filmovi[0];
      });
  }
  onSalaSearch(event: string) {
    this.salaSearchTerm = event;
    this.hallsService
      .getAllSale({ nazivSale: this.salaSearchTerm })
      .subscribe((sale) => {
        this.sale = sale;
        this.selectedSala = this.sale[0];
      });
  }
  saveProjection() {
    this.projectionService
      .addProjekcija({
        ...this.projekcija,
        datumProjekcije: new Date(this.datumProjekcije),
        film: this.selectedFilm,
        sala: this.selectedSala,
        filmId: this.selectedFilm?.id,
        salaId: this.selectedSala?.id,
        tipProjekcije: 1,
      })
      .subscribe(() => {});
  }
  editProjection() {
    this.projectionService
      .patchProjekcija({
        ...this.projekcija,
        datumProjekcije: new Date(this.datumProjekcije),
        film: this.selectedFilm,
        sala: this.selectedSala,
        filmId: this.selectedFilm?.id,
        salaId: this.selectedSala?.id,
        tipProjekcije: 1,
      })
      .subscribe(() => {
        this.location.back();
      });
  }
  get isEditMode() {
    return this.crudFormMode === CrudMode.UPDATE;
  }
}
