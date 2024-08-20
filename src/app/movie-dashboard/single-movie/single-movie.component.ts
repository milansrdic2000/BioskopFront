import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../data-access/movies/movies.service';
import { Film } from '../../data-access/movies/filmovi';
import { getEnumAsString } from '../../shared/utils/enum-util';
import { Zanr } from '../../data-access/movies/zanrovi';
import { dateToString, dateToTimeString } from '../../shared/utils/date-util';
import { ProjectionsService } from '../../data-access/projections/projections.service';
import { Projekcija } from '../../data-access/projections/projekcije';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.scss',
})
export class SingleMovieComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private projectionService: ProjectionsService
  ) {}

  movie: Film;

  projections: Projekcija[] = [];

  trackDates: Date[] = [];

  selectedDate: Date;

  ngOnInit() {
    for (let i = 0; i < 7; i++) {
      const date = new Date(new Date().setDate(new Date().getDate() + i));
      if (i === 0) {
        this.selectedDate = date;
      }
      this.trackDates.push(date);
    }
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getSingleMovie(params.id).subscribe((data) => {
        this.movie = data;
        this.projectionService
          .getProjekcije({ movieName: this.movie.nazivFilma! })
          .subscribe((data) => {
            this.projections = data;
          });
      });
    });
  }
  onProjectionClick(projection: Projekcija) {
    this.router.navigate(['/rezervacije/projekcije/' + projection.id]);
  }

  getProjectionsForDate() {
    const date = this.selectedDate;
    return this.projections.filter((p) => {
      return (
        new Date(p.datumProjekcije as Date).getDate() === date.getDate() &&
        new Date(p.datumProjekcije as Date).getMonth() === date.getMonth()
      );
    });
  }

  getGenre() {
    return getEnumAsString(this.movie?.zanrId!, Zanr);
  }
  getPremijera() {
    return dateToString(this.movie?.datumPremijere as Date);
  }
  getReziserImePrezime() {
    return this.movie?.reziser?.ime + ' ' + this.movie?.reziser?.prezime;
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }
  getMonth(date: Date) {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAJ',
      'JUN',
      'JUL',
      'AVG',
      'SEP',
      'OKT',
      'NOV',
      'DEC',
    ];

    return months[date.getMonth()];
  }
  getTime(date: Date) {
    return dateToTimeString(date);
  }
  getDayOfWeek(date: Date) {
    const days = ['NED', 'PON', 'UTO', 'SRE', 'CET', 'PET', 'SUB'];
    return days[date.getDay()];
  }
  isDateSelected(date: Date) {
    return this.selectedDate === date;
  }
}
