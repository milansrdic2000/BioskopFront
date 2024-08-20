import { Component } from '@angular/core';
import { ReservationsService } from '../../data-access/reservations/reservations.service';
import { Rezervacija } from '../../data-access/reservations/rezervacija';
import { dateToString } from '../../shared/utils/date-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent {
  rezervacije: Rezervacija[] = [];
  constructor(
    private reservationsService: ReservationsService,
    private router: Router
  ) {
    this.reservationsService.getRezervacije({}).subscribe((rezervacije) => {
      this.rezervacije = rezervacije;
    });
  }
  viewReservation(idProjekcije: number | undefined) {
    this.router.navigate(['rezervacije/projekcije', idProjekcije]);
  }
  formatDate(date: Date | string | undefined) {
    if (!date) {
      return '';
    }
    return dateToString(new Date(date));
  }
}
