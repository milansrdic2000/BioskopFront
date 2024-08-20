import { Component, Input, Output } from '@angular/core';
import { CrudMode, Sediste } from '../../data-access/halls/sediste';
import { Karta } from '../../data-access/reservations/karta';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-hall-seats',
  templateUrl: './hall-seats.component.html',
  styleUrl: './hall-seats.component.scss',
})
export class HallSeatsComponent {
  @Input() rowNumber: number;
  @Input() columnNumber: number;
  @Input() sedistaList: Sediste[] | undefined;

  @Input() karte: Karta[];
  @Input() mode: 'reservation' | 'admin' = 'reservation';
  @Output() seatClicked = new Subject<Sediste>();

  crudMode: CrudMode;
  crudModeEnum = CrudMode;

  takenSeats: number[][] = [];

  userSelectedSeats: number[][] = [];

  seatsMatrix: Sediste[][] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    this.generateSeats();
  }

  getRows() {
    return this.seatsMatrix;
  }
  generateSeats() {
    this.seatsMatrix = [];
    // if ((!this.rowNumber || !this.columnNumber) && this.sedistaList) {
    if (this.sedistaList) {
      this.rowNumber = Math.max(
        ...(this.sedistaList.map((seat) => seat.red!) || [])
      );
      this.columnNumber = Math.max(
        ...(this.sedistaList?.map((seat) => seat.kolona!) || [])
      );
    }
    for (let i = 0; i < this.rowNumber; i++) {
      this.seatsMatrix[i] = [];
      for (let j = 0; j < this.columnNumber; j++) {
        const sedisteInput = this.sedistaList?.find(
          (sediste) => sediste.red === i + 1 && sediste.kolona === j + 1
        );
        const karta = this.karte?.find(
          (karta) => karta.sedisteId === sedisteInput?.idSedista
        );
        this.seatsMatrix[i].push({
          kolona: j + 1,
          red: i + 1,
          ...sedisteInput,
        });
        if (this.mode === 'reservation') {
          if (karta && this.authService.getUser()?.id === karta.korisnikId) {
            this.seatsMatrix[i][j].activeSelected = true;
          } else if (karta) {
            this.seatsMatrix[i][j].taken = true;
          }
        } else if (this.mode === 'admin') {
          if (sedisteInput?.idSedista) {
            this.seatsMatrix[i][j].operation = CrudMode.NEUTRAL; // no action (NEUTRAL STATE)
          } else if (
            !sedisteInput?.idSedista &&
            sedisteInput?.operation === CrudMode.ADD
          ) {
            this.seatsMatrix[i][j].operation = CrudMode.ADD;
          } else if (
            !sedisteInput?.idSedista &&
            sedisteInput?.operation !== CrudMode.ADD
          ) {
            this.seatsMatrix[i][j].operation = CrudMode.ADD_CANDIDATE;
          }
        }
      }
    }
    console.log(this.seatsMatrix);
  }
  selectSeat(rowIndex: number, columnIndex: number) {
    const seat = this.seatsMatrix[rowIndex][columnIndex];
    if (this.mode === 'reservation') {
      if (seat.taken) {
        this.notificationService.showNotification.next({
          message: 'Sediste je vec zauzeto',
          type: 'error',
        });
        return;
      }
      if (!seat.idSedista) {
        this.notificationService.showNotification.next({
          message: 'Sediste je nedostupno u datoj sali',
          type: 'error',
        });
        return;
      }
      seat.activeSelected = !seat.activeSelected;
    } else if (this.mode === 'admin') {
      if (!seat.idSedista) {
        if (seat.operation === CrudMode.ADD_CANDIDATE) {
          seat.operation = CrudMode.ADD;
        } else if (seat.operation === CrudMode.ADD) {
          seat.operation = CrudMode.ADD_CANDIDATE;
        }
      } else {
        if (seat.operation === CrudMode.NEUTRAL) {
          seat.operation = CrudMode.DELETE;
        } else if (seat.operation === CrudMode.DELETE) {
          seat.operation = CrudMode.NEUTRAL;
        }
      }
    }
    this.seatClicked.next(seat);
  }
}
