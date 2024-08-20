import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showNotification: Subject<{ type: 'error' | 'success'; message: string }> =
    new Subject();
  showHideModal: Subject<boolean> = new Subject();
  constructor() {}
}
