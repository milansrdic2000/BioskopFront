import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-data-row',
  templateUrl: './data-row.component.html',
  styleUrl: './data-row.component.scss',
})
export class DataRowComponent {
  @Input() title: string;
  @Input() description: string;

  @Output() editClick: Subject<void> = new Subject<void>();
  @Output() deleteClick: Subject<void> = new Subject<void>();

  onEditClick() {
    this.editClick.next();
  }
  onDeleteClick() {
    this.deleteClick.next();
  }
}
