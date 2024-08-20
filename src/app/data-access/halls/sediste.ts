import { Sala } from './sale';

export enum CrudMode {
  ADD = 'ADD',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  NEUTRAL = 'NEUTRAL',
  ADD_CANDIDATE = 'ADD_CANDIDATE',
}
export interface Sediste {
  idSale?: number;
  idSedista?: number;
  red?: number;
  kolona?: number;

  taken?: boolean;
  disabled?: boolean;
  activeSelected?: boolean;

  operation?: CrudMode;
  sala?: Sala;
}
