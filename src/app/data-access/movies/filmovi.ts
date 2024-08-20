import { Administrator } from '../users/Administrator';
import { Reziser } from './reziseri';
import { Zanr } from './zanrovi';

export interface Film {
  id?: number;
  nazivFilma?: string;
  opisFilma?: string;
  trajanje?: number;
  datumPremijere?: Date | string;
  reziserId?: number;
  zanrId?: number;
  administratorId?: number;

  imgPath?: string;
  reziser?: Reziser;
  zanr?: Zanr;
  administrator?: Administrator;
}
