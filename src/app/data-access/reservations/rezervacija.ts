import { Projekcija } from '../projections/projekcije';
import { Korisnik } from '../users/Korisnik';
import { Karta } from './karta';

export interface Rezervacija {
  korisnikId?: number;
  idProjekcije?: number;
  datumRezervacije?: Date;

  korisnik?: Korisnik;
  projekcija?: Projekcija;

  listaKarata?: Karta[];
}
