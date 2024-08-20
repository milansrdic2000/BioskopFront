import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SingleMovieComponent } from './single-movie/single-movie.component';

@NgModule({
  declarations: [MovieDashboardComponent, SingleMovieComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'filmovi',
        component: MovieDashboardComponent,
      },
      {
        path: 'filmovi/:id',
        component: SingleMovieComponent,
      },
    ]),
  ],
})
export class MovieDashboardModule {}
