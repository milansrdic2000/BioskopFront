export interface Korisnik {
  id: number;
  email?: string;
  sifra?: string;
  ime?: string;
  prezime?: string;
  datumRodjenja?: Date;
}