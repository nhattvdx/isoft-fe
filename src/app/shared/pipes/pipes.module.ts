import { NgModule } from '@angular/core';
import { ConvertMoneyPipe } from '.';
import { AmountCostPipe } from './amount-cost.pipe';
import { ConvertTimeByFormatPipe } from './convert-timeByFormat.pipe';
import { UnitConvertionPipe } from './unit-convertion.pipe';

const PIPES = [
    AmountCostPipe,
    ConvertMoneyPipe,
    ConvertTimeByFormatPipe,
    UnitConvertionPipe,
];

@NgModule({
    declarations: [...PIPES],
    imports: [],
    exports: [...PIPES],
})
export class PipesModule {}
