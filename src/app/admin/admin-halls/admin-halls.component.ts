import { Component } from '@angular/core';
import { Sala } from '../../data-access/halls/sale';
import { HallsService } from '../../data-access/halls/halls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-halls',
  templateUrl: './admin-halls.component.html',
  styleUrl: './admin-halls.component.scss',
})
export class AdminHallsComponent {
  halls: Sala[] = [];

  salaSearchTerm = '';
  constructor(private hallsService: HallsService, private router: Router) {
    this.hallsService.getAllSale({}).subscribe((halls) => {
      this.halls = halls;
    });
  }

  onSearchChange(searchTerm: string) {
    this.salaSearchTerm = searchTerm;
    this.hallsService
      .getAllSale({ nazivSale: searchTerm })
      .subscribe((halls) => {
        this.halls = halls;
      });
  }
  dodajSalu() {
    this.router.navigate(['/admin/sale', 'nova']);
  }
  onEditClick(hall: Sala) {
    this.router.navigate(['/admin/sale', hall.id]);
  }
  onDeleteClick(hall: Sala) {
    this.hallsService.deleteSala(hall.id!).subscribe(() => {
      this.halls = this.halls.filter((h) => h.id !== hall.id);
    });
  }
}
