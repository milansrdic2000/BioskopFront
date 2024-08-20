import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Film } from '../../../data-access/movies/filmovi';
import { MoviesService } from '../../../data-access/movies/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Reziser } from '../../../data-access/movies/reziseri';
import { EnumsService } from '../../../data-access/enums/enums.service';
import { dateToString } from '../../../shared/utils/date-util';
import { Zanr } from '../../../data-access/movies/zanrovi';
import { getEnumAsString } from '../../../shared/utils/enum-util';
import { Location } from '@angular/common';
import { CrudMode } from '../../../data-access/halls/sediste';
import { UploadService } from '../../../data-access/upload/upload.service';
@Component({
  selector: 'app-admin-single-movie',
  templateUrl: './admin-single-movie.component.html',
  styleUrl: './admin-single-movie.component.scss',
})
export class AdminSingleMovieComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  film: Film = {};
  reziseri: Reziser[];
  genresList = Object.keys(Zanr).filter((key) => isNaN(+key));
  datumPremijereFilma: string;

  selectedGenre: Zanr | null;
  selectedReziser: Reziser;

  crudFormMode: CrudMode = CrudMode.ADD;
  constructor(
    private moviesService: MoviesService,
    private enumsService: EnumsService,
    private activatedRoute: ActivatedRoute,
    public uploadService: UploadService,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.enumsService.getReziseri().subscribe((reziseri) => {
        this.reziseri = reziseri;

        if (params.id === 'novi') {
          this.selectedReziser = this.reziseri[0];
          this.selectedGenre = Zanr.Akcija;
          this.datumPremijereFilma = dateToString(new Date());
          this.film = {
            nazivFilma: '',
            opisFilma: '',
            trajanje: 0,
            zanrId: 0,
            reziser: this.selectedReziser,
          };

          console.log(this.film);
          return;
        }

        this.moviesService.getSingle('/' + params.id).subscribe((film) => {
          this.crudFormMode = CrudMode.UPDATE;
          this.film = film;
          this.selectedReziser =
            this.reziseri.find((reziser) => film.reziserId === reziser.id) ||
            this.reziseri[0];
          this.selectGenre(this.film.zanrId!);
          this.datumPremijereFilma = dateToString(
            new Date(this.film.datumPremijere as string)
          );
          console.log(this.film);
        });
      });
    });
  }
  editFilm() {
    this.moviesService
      .patchFilm(this.film.id!, {
        ...this.film,
        reziserId: this.selectedReziser.id,
        reziser: {
          id: this.selectedReziser.id,
          ime: this.selectedReziser.ime,
          prezime: this.selectedReziser.prezime,
        },
        zanrId: this.selectedGenre!,
        datumPremijere: this.datumPremijereFilma,
      })
      .subscribe((film) => {
        this.location.back();
      });
  }
  saveFilm() {
    console.log(this.selectedGenre);
    this.moviesService
      .addFilm({
        ...this.film,
        reziser: this.selectedReziser,
        zanrId: this.selectedGenre!,
        datumPremijere: this.datumPremijereFilma,
      })
      .subscribe((film) => {
        this.location.back();
      });
  }
  selectGenre(genre: Zanr) {
    if (this.selectedGenre === genre) {
      this.selectedGenre = null;
    } else {
      this.selectedGenre = genre;
    }
  }
  isInEditMode() {
    return this.crudFormMode === CrudMode.UPDATE;
  }
  getGenre(genre: string | number) {
    return getEnumAsString(genre, Zanr);
  }
  // http://localhost:4200/assets/uploads/test.png
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadService.uploadImage(file).subscribe((res) => {
        console.log(res);
        this.film.imgPath = res.url;
      });
    }
  }
  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }
}
