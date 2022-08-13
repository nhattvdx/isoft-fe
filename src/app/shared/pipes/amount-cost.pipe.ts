import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from 'src/app/utilities/helper.help';

@Pipe({ name: 'amountCost', pure: false })
export class AmountCostPipe implements PipeTransform {
    constructor() {}
    transform(values: any): number {
        let total: number = 0;
        if (values) {
            if (Helper.isNumeric(values.quality)) {
                total = Helper.numberCutTo(
                    Helper.multiply(+values.quality, values.cost)
                );
            }
        }
        return total;
    }
}
