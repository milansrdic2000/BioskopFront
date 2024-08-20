import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleReservationComponent } from './single-reservation/single-reservation.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

@NgModule({
  declarations: [SingleReservationComponent, ReservationListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'projekcije/:idProjekcije',
        component: SingleReservationComponent,
      },
      {
        path: '',
        component: ReservationListComponent,
      },
    ]),
  ],
})
export class ReservationsModule {}
