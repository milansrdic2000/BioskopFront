import { Component } from '@angular/core';
import { HallsService } from '../../../data-access/halls/halls.service';
import { ActivatedRoute } from '@angular/router';
import { Sala } from '../../../data-access/halls/sale';
import { CrudMode, Sediste } from '../../../data-access/halls/sediste';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-single-hall',
  templateUrl: './admin-single-hall.component.html',
  styleUrl: './admin-single-hall.component.scss',
})
export class AdminSingleHallComponent {
  hall: Sala = { nazivSale: 'Naziv Sale' };

  generatedRowsNumber: number = 4;
  generatedColumnsNumber: number = 4;

  sedistaPayload: Sediste[] = [];

  crudFormMode: CrudMode = CrudMode.ADD;
  crudModeEnum = CrudMode;

  constructor(
    private hallsService: HallsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id === 'nova') {
        return;
      }
      this.hallsService.getSala({ idSale: id }).subscribe((halls) => {
        this.hall = halls;
        this.crudFormMode = CrudMode.UPDATE;
      });
    });
  }

  generateSeats() {
    const sedista: Sediste[] = [];

    for (let i = 0; i < this.generatedRowsNumber; i++) {
      for (let j = 0; j < this.generatedColumnsNumber; j++) {
        if (this.crudFormMode === CrudMode.UPDATE) {
          const sediste = this.hall.listaSedista!.find(
            (s) => s.red === i + 1 && s.kolona === j + 1
          );
          if (sediste) {
            sedista.push(sediste);
            continue;
          } else {
            sedista.push({
              red: i + 1,
              kolona: j + 1,
              operation: CrudMode.ADD,
            });
          }
        } else {
          sedista.push({ red: i + 1, kolona: j + 1, operation: CrudMode.ADD });
        }
      }
    }

    this.hall.listaSedista = sedista;

    this.sedistaPayload = sedista.filter(
      (s) => s.operation === CrudMode.ADD || s.operation === CrudMode.DELETE
    );
  }

  onSeatClicked(seat: Sediste) {
    console.log(seat);
    if (
      seat.operation === CrudMode.NEUTRAL ||
      seat.operation === CrudMode.ADD_CANDIDATE
    ) {
      this.sedistaPayload = this.sedistaPayload.filter(
        (s) => !(s.kolona === seat.kolona && s.red === seat.red)
      );
    }
    if (seat.operation === CrudMode.DELETE || seat.operation === CrudMode.ADD) {
      this.sedistaPayload.push(seat);
    }

    console.log(this.sedistaPayload);
  }
  dodajSalu() {
    this.hallsService.dodajSalu(this.hall).subscribe((res) => {
      console.log(res);
      this.location.back();
    });
  }
  izmeniSalu() {
    this.hallsService
      .izmeniSalu({ ...this.hall, listaSedista: this.sedistaPayload })
      .subscribe((res) => {
        console.log(res);
        this.location.back();
      });
  }
}
