import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isoToLocaleDate' })
export class IsoToLocaleDatePipe implements PipeTransform {
  transform(value: Date): string {
    return new Date(value).toLocaleDateString();
  }
}