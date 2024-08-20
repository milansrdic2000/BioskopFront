import { Component, Input, Output } from '@angular/core';
import { dateToString } from '../utils/date-util';
import { getEnumAsString } from '../utils/enum-util';
import { Zanr } from '../../data-access/movies/zanrovi';
import { Subject } from 'rxjs';
import { Film } from '../../data-access/movies/filmovi';
import { UploadService } from '../../data-access/upload/upload.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie: Film;
  @Output() movieClick = new Subject<number>();
  constructor(public uploadService: UploadService) {}

  ngOnInit() {
    console.log('Movie card initialized', this.movie);
  }
  formatDate(): string {
    return dateToString(this.movie.datumPremijere as Date);
  }
  getGenre() {
    const genre = this.movie.zanrId;
    const da = getEnumAsString(genre!, Zanr);

    return getEnumAsString(genre!, Zanr);
  }

  onMovieClick() {
    this.movieClick.next(this.movie.id!);
  }
}
