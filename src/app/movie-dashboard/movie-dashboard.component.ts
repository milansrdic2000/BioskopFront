import { Component } from '@angular/core';
import { Zanr } from '../data-access/movies/zanrovi';
import { Film } from '../data-access/movies/filmovi';
import { MoviesService } from '../data-access/movies/movies.service';
import { getEnumAsString } from '../shared/utils/enum-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrl: './movie-dashboard.component.scss',
})
export class MovieDashboardComponent {
  genresEnum = Zanr;
  genresList = Object.keys(Zanr).filter((key) => isNaN(+key));
  selectedGenre: Zanr | null;

  moviesList: Film[] = [];
  constructor(private movieService: MoviesService, private router: Router) {
    this.selectedGenre = Zanr.Akcija;
  }

  ngOnInit() {
    this.getAllMoviesQuery().subscribe((data) => {
      this.moviesList = data;
    });
  }
  selectGenre(genre: Zanr) {
    if (this.selectedGenre === genre) {
      this.selectedGenre = null;
    } else {
      this.selectedGenre = genre;
    }
    this.getAllMoviesQuery().subscribe((data) => {
      this.moviesList = data;
    });
  }

  onMovieClick(event: number) {
    this.router.navigate(['filmovi/' + event]);
  }

  getGenre(genre: string | number) {
    return getEnumAsString(genre, Zanr);
  }

  getAllMoviesQuery() {
    return this.movieService.getMovies({
      genreName: this.getGenre(this.selectedGenre || ''),
    });
  }
}
