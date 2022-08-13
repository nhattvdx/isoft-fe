import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'totalCost'})
export class TotalCostPipe implements PipeTransform {
  constructor() { }
  transform(values: any[]): number {
    let total: number = 0;
    if (values.length) total = values.map((p: any) => p.cost).reduce((a, b) => { return a + b }, 0);
    return total;
  }
}