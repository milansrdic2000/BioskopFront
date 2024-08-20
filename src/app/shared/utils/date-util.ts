import moment from 'moment';

export function dateToString(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
}
export function dateToTimeString(date: Date): string {
  return moment(date).format('HH:mm');
}
export function dateToDateTimeString(date: Date): string {
  return moment(date).format('YYYY-MM-DD HH:mm');
}
