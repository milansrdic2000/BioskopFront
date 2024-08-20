import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessModule } from '../data-access/data-access.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SnackNotificationComponent } from './snack-notification/snack-notification.component';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HallSeatsComponent } from './hall-seats/hall-seats.component';
import { DataRowComponent } from './data-row/data-row.component';

@NgModule({
  declarations: [
    SnackNotificationComponent,
    NavigationComponent,
    MovieCardComponent,
    HallSeatsComponent,
    DataRowComponent,
  ],
  imports: [
    CommonModule,
    DataAccessModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    DataAccessModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    SnackNotificationComponent,
    NgxSpinnerComponent,
    NavigationComponent,
    MovieCardComponent,
    HallSeatsComponent,
    DataRowComponent,
  ],
})
export class SharedModule {}
