import { Component } from '@angular/core';
import { Projekcija } from '../../data-access/projections/projekcije';
import { ProjectionsService } from '../../data-access/projections/projections.service';
import { Router } from '@angular/router';
import { Film } from '../../data-access/movies/filmovi';
import { MoviesService } from '../../data-access/movies/movies.service';
import { dateToString } from '../../shared/utils/date-util';

@Component({
  selector: 'app-admin-projections',
  templateUrl: './admin-projections.component.html',
  styleUrl: './admin-projections.component.scss',
})
export class AdminProjectionsComponent {
  projections: Projekcija[] = [];
  constructor(
    private projectionService: ProjectionsService,
    private router: Router
  ) {
    this.projectionService.getProjekcije({}).subscribe((projekcije) => {
      this.projections = projekcije;
    });
  }

  projectionSearchTerm = '';
  onSearchChange(searchTerm: string) {
    this.projectionSearchTerm = searchTerm;
    this.projectionService
      .getProjekcije({ movieName: searchTerm })
      .subscribe((movies) => {
        this.projections = movies;
      });
  }
  dodajProjekciju() {
    this.router.navigate(['/admin/projekcije', 'novi']);
  }
  onEditClick(projekcija: Projekcija) {
    this.router.navigate(['/admin/projekcije', projekcija.id]);
  }
  onDeleteClick(projekcija: Projekcija) {
    this.projectionService.deleteProjekcija(projekcija.id!).subscribe(() => {
      this.projections = this.projections.filter((m) => m.id !== projekcija.id);
    });
  }
  getDatumProjekcije(projekcija: Projekcija) {
    return dateToString(projekcija.datumProjekcije as Date);
  }
}
