import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'gender'})
export class GemderPipe implements PipeTransform {
  constructor() { }
  transform(value: number): string {
    let str: string = '';
    str = (value) ? 'Nữ' : 'Nam';
    return str;
  }
}