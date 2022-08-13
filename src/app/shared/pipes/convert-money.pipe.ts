import { Pipe, PipeTransform } from '@angular/core';
import { UnitConventionService } from 'src/app/service/unit-convention.service';
import { Helper } from 'src/app/utilities/helper.help';

@Pipe({ name: 'convertMoney', pure: false })
export class ConvertMoneyPipe implements PipeTransform {
    constructor(
        private readonly unitConventionService: UnitConventionService
    ) {}
    transform(val: string | number): string {
        if (!val) {
            return '0.00';
        }
        let moneyFormat = '';
        this.unitConventionService.unitConvention.subscribe((res) => {
            if (Helper.isNumeric(val)) {
                moneyFormat = Helper.convertMoney(val, Helper.THOUSAND_UNIT);
            }
        });
        if (Helper.isNumeric(val)) {
            moneyFormat = Helper.convertMoney(val, Helper.THOUSAND_UNIT);
        }
        return moneyFormat;
    }
}
