import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';
import { Sala } from './sale';

@Injectable({
  providedIn: 'root',
})
export class HallsService extends BaseDataAccessService<Sala> {
  constructor(injector: Injector) {
    super('/sale', injector);
  }

  getSala({ idSale }: { idSale?: number }) {
    return this.getSingle(`/${idSale}`);
  }
  getAllSale({ nazivSale }: { nazivSale?: string }) {
    let queryString = '?';
    if (nazivSale) {
      queryString += `nazivSale=${nazivSale}`;
    }
    return this.getAll(queryString);
  }
  dodajSalu(sala: Sala) {
    return this.post('', sala);
  }
  izmeniSalu(sala: Sala) {
    return this.patch('/' + sala.id, sala);
  }
  deleteSala(idSale: number) {
    return this.delete(`/${idSale}`);
  }
}
