import { Component } from '@angular/core';
import { ReservationsService } from '../../data-access/reservations/reservations.service';
import { Rezervacija } from '../../data-access/reservations/rezervacija';
import { ActivatedRoute } from '@angular/router';
import { Karta } from '../../data-access/reservations/karta';
import { HallsService } from '../../data-access/halls/halls.service';
import { Sala } from '../../data-access/halls/sale';
import { CrudMode, Sediste } from '../../data-access/halls/sediste';
import { AuthService } from '../../shared/auth.service';
import { Location } from '@angular/common';
import { ProjectionsService } from '../../data-access/projections/projections.service';
import { of } from 'rxjs';
import { Film } from '../../data-access/movies/filmovi';
import { Projekcija } from '../../data-access/projections/projekcije';
import { dateToString, dateToTimeString } from '../../shared/utils/date-util';
@Component({
  selector: 'app-single-reservation',
  templateUrl: './single-reservation.component.html',
  styleUrl: './single-reservation.component.scss',
})
export class SingleReservationComponent {
  allReservations: Rezervacija[];
  tickets: Karta[];

  ticketsPayload: Karta[] = [];

  hall: Sala;
  idProjekcije: number;
  idSale: number;

  rowNumber = 0;
  seatNumber = 0;

  ticketsCount = 0;

  newReservation: boolean = false;
  currentMovie: Film;
  currentProjection: Projekcija;
  constructor(
    private reservationService: ReservationsService,
    private hallsService: HallsService,
    private projectionService: ProjectionsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.idProjekcije = params['idProjekcije'];
      this.reservationService
        .getRezervacije({ idProjekcije: this.idProjekcije })
        .subscribe((rezervacija) => {
          this.newReservation = !rezervacija.find(
            (reservation) =>
              reservation.korisnikId === this.authService.getUser().id
          );

          const nextObs$ = this.newReservation
            ? this.projectionService.getProjekcija(this.idProjekcije)
            : of<Projekcija>({
                salaId: rezervacija[0].projekcija?.salaId,
              });
          nextObs$.subscribe((projekcija) => {
            this.idSale = projekcija.salaId!;
            this.currentProjection = this.newReservation
              ? projekcija
              : rezervacija[0].projekcija!;

            this.currentMovie = this.currentProjection.film!;

            this.hallsService
              .getSala({ idSale: this.idSale })
              .subscribe((sala) => {
                this.hall = sala;

                this.allReservations = rezervacija;
                this.tickets = this.parseTickets(rezervacija);
                this.tickets.forEach((ticket) => {
                  if (ticket.korisnikId === this.authService.getUser().id) {
                    this.ticketsCount++;
                  }
                });
                console.log(this.tickets);
              });
          });
        });
    });
  }

  onSeatClicked(seat: Sediste) {
    const kartaPayload = this.ticketsPayload.find(
      (tiket) => tiket.sedisteId === seat.idSedista
    );
    const kartaOriginal = this.tickets.find(
      (tiket) => tiket.sedisteId === seat.idSedista
    );
    // if object is already for payload
    if (kartaPayload) {
      if (seat.activeSelected) {
        this.ticketsPayload = this.ticketsPayload.filter(
          (tiket) => tiket.sedisteId !== seat.idSedista
        );
        this.ticketsCount--;
      } else if (!seat.activeSelected) {
        if (kartaOriginal) {
          kartaPayload.operation = CrudMode.DELETE;
        } else {
          this.ticketsPayload = this.ticketsPayload.filter(
            (tiket) => tiket.sedisteId !== seat.idSedista
          );
          this.ticketsCount--;
        }
      }
    } else {
      this.ticketsPayload.push({
        kartaId: kartaOriginal?.kartaId,
        korisnikId: this.authService.getUser().id,
        projekcijaId: this.idProjekcije,
        salaId: this.idSale,
        sedisteId: seat.idSedista,
        operation: seat.activeSelected ? CrudMode.ADD : CrudMode.DELETE,
      });
      if (seat.activeSelected) this.ticketsCount++;
      else this.ticketsCount--;
    }

    console.log(this.ticketsPayload);
  }
  reserve() {
    if (!this.isReserveAllowed()) return;
    if (this.newReservation)
      this.reservationService
        .addRezervacija(this.idProjekcije, this.ticketsPayload)
        .subscribe((res) => {
          console.log(res);
        });
    else {
      this.reservationService
        .patchRezervacija({
          idKorisnika: this.authService.getUser().id!,
          idProjekcije: this.idProjekcije,
          listaKarata: this.ticketsPayload,
        })
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
  parseTickets(reservations: Rezervacija[]) {
    return reservations.flatMap((reservation) => reservation.listaKarata || []);
  }

  getFullPrice() {
    return this.ticketsCount * (this.currentProjection?.cenaKarte || 0);
  }
  getDatumProjekcije() {
    return (
      dateToString(this.currentProjection?.datumProjekcije!) +
      ', ' +
      dateToTimeString(this.currentProjection?.datumProjekcije!)
    );
  }
  goToReservationList() {
    this.location.back();
  }
  isReserveAllowed() {
    return this.ticketsPayload.length > 0;
  }
}
