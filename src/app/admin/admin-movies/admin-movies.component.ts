import { Component } from '@angular/core';
import { MoviesService } from '../../data-access/movies/movies.service';
import { Film } from '../../data-access/movies/filmovi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrl: './admin-movies.component.scss',
})
export class AdminMoviesComponent {
  movies: Film[] = [];
  constructor(private movieService: MoviesService, private router: Router) {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  movieSearchTerm = '';
  onSearchChange(searchTerm: string) {
    this.movieSearchTerm = searchTerm;
    this.movieService
      .getMovies({ movieName: searchTerm })
      .subscribe((movies) => {
        this.movies = movies;
      });
  }
  dodajFilm() {
    this.router.navigate(['/admin/filmovi', 'novi']);
  }
  onEditClick(movie: Film) {
    this.router.navigate(['/admin/filmovi', movie.id]);
  }
  onDeleteClick(movie: Film) {
    this.movieService.deleteFilm(movie.id!).subscribe(() => {
      this.movies = this.movies.filter((m) => m.id !== movie.id);
    });
  }
}
