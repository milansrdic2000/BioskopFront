import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMoviesComponent } from './admin-movies/admin-movies.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminSingleMovieComponent } from './admin-movies/admin-single-movie/admin-single-movie.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdminHallsComponent } from './admin-halls/admin-halls.component';
import { AdminSingleHallComponent } from './admin-halls/admin-single-hall/admin-single-hall.component';
import { AdminProjectionsComponent } from './admin-projections/admin-projections.component';
import { AdminSingleProjectionComponent } from './admin-projections/admin-single-projection/admin-single-projection.component';

@NgModule({
  declarations: [
    AdminMoviesComponent,
    AdminSingleMovieComponent,
    AdminHallsComponent,
    AdminSingleHallComponent,
    AdminProjectionsComponent,
    AdminSingleProjectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'filmovi',
        pathMatch: 'full',
      },
      {
        path: 'filmovi',
        component: AdminMoviesComponent,
      },
      {
        path: 'filmovi/:id',
        component: AdminSingleMovieComponent,
      },
      {
        path: 'sale',
        component: AdminHallsComponent,
      },
      {
        path: 'sale/:id',
        component: AdminSingleHallComponent,
      },
      {
        path: 'projekcije',
        component: AdminProjectionsComponent,
      },
      {
        path: 'projekcije/:id',
        component: AdminSingleProjectionComponent,
      },
    ]),
  ],
})
export class AdminModule {}
