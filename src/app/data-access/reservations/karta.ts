import { CrudMode } from '../halls/sediste';

export interface Karta {
  korisnikId?: number;
  projekcijaId?: number;
  kartaId?: number;
  salaId?: number;
  sedisteId?: number;
  operation?: CrudMode;
}
