import { Pipe, PipeTransform } from '@angular/core';
import { UnitConventionService } from 'src/app/service/unit-convention.service';
import { Helper } from 'src/app/utilities/helper.help';

@Pipe({ name: 'dateConvert', pure: false })
export class DateConvertPipe implements PipeTransform {
  constructor(
    private readonly unitConventionService: UnitConventionService
  ) { }
  transform(date: string | number | Date): string {
    if (!date) return '';
    let datetmp: string = '';
    this.unitConventionService.unitConvention.subscribe(res => {
      datetmp = Helper.convertDateWithType(date, Helper.DAY_TYPE);
    });
    datetmp = Helper.convertDateWithType(date, Helper.DAY_TYPE);
    return datetmp;
  }
}