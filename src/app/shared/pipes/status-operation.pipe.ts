import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statusOperation'})
export class StatusOperationPipe implements PipeTransform {
  constructor() { }
  transform(value: boolean): string {
    let str: string = '';
    str = (value) ? 'Ngày tạo' : 'Ngưng hoạt động';
    return str;
  }
}