import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-snack-notification',
  templateUrl: './snack-notification.component.html',
  styleUrl: './snack-notification.component.scss',
})
export class SnackNotificationComponent {
  @Input() message: string = 'Message';
  hidden = true;
  type: 'error' | 'success';

  loadingModal = false;
  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
    this.notificationService.showNotification.subscribe((notification) => {
      this.message = notification.message;
      this.type = notification.type;
      this.hidden = false;

      setTimeout(() => {
        this.close();
      }, 2000);
    });
    this.notificationService.showHideModal.subscribe((value) => {
      this.showHideModal(value);
    });
  }
  ngOnInit() {}
  close() {
    this.message = '';
    this.hidden = true;
    this.cdr.detectChanges();
  }
  showHideModal(show: boolean) {
    this.loadingModal = show;
    this.cdr.detectChanges();
    if (show) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
