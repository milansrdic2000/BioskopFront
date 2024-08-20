import { Injectable, Injector } from '@angular/core';
import { BaseDataAccessService } from '../base-data-access.service';

@Injectable({
  providedIn: 'root',
})
export class EnumsService extends BaseDataAccessService<any> {
  constructor(injector: Injector) {
    super('', injector);
  }

  getReziseri() {
    return this.getAll('/reziseri');
  }
}
