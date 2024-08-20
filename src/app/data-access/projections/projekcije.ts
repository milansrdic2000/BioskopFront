import { Sala } from '../halls/sale';
import { Film } from '../movies/filmovi';

export enum TipProjekcije {
  _2D = '2D',
  _3D = '3D',
}
export interface Projekcija {
  id?: number;
  datumProjekcije?: Date;
  cenaKarte?: number;
  tipProjekcije?: TipProjekcije | number;
  salaId?: number;
  filmId?: number;

  sala?: Sala;
  film?: Film;
}
