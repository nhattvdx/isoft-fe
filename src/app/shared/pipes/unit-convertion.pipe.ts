import { Pipe, PipeTransform } from '@angular/core';
import { UnitConvertTypeEnum } from 'src/app/enums/unit-convert-type';
import { UnitConvention } from 'src/app/models/unit.model';
import { UnitConventionService } from 'src/app/service/unit-convention.service';
import { Helper } from 'src/app/utilities/helper.help';

@Pipe({ name: 'unitConvert', pure: true })
export class UnitConvertionPipe implements PipeTransform {
    public unitConvention: UnitConvention = null;
    constructor(private readonly unitConventionService: UnitConventionService) {
        this.unitConventionService.unitConvention.subscribe((res) => {
            this.unitConvention = res;
        });
    }

    // type: Loại đơn vị cần chuyển đổi theo cấu hình đã định trước
    transform(
        val: string | number,
        type: UnitConvertTypeEnum,
        currElId: string = ''
    ): string {
        if (this.unitConvention != null) {
            // (`Nhận được dữ liệu: ${val}`);
            val = this.unitConventionService.trueNumber(
                val.toString(),
                this.unitConvention.thousandUnit,
                this.unitConvention.decimalUnit
            );
            var roundDecimalNumber = 1;
            if (type == UnitConvertTypeEnum.Quatity) {
                roundDecimalNumber = this.unitConvention.quatity;
            } else if (type == UnitConvertTypeEnum.UnitCost) {
                roundDecimalNumber = this.unitConvention.unitCost;
            } else if (type == UnitConvertTypeEnum.Money) {
                roundDecimalNumber = this.unitConvention.money;
            } else if (type == UnitConvertTypeEnum.Currency) {
                roundDecimalNumber = this.unitConvention.currency;
            }
            var roundedNumber = this.unitConventionService
                .roundNumber(parseFloat(val.toString()), roundDecimalNumber)
                .toString();
            // (
            //   `Làm tròn ${roundDecimalNumber} chữ số thập phân: ${val} -> ${roundedNumber}`
            // );
            var taithz = '';
            var naturalPaths = roundedNumber;
            if (roundedNumber.includes('.')) {
                taithz = roundedNumber.split('.')[1];
                naturalPaths = roundedNumber.split('.')[0];
                // (
                //   `Tách được phần thập phân: ${taithz} - Phần Nguyên: ${naturalPaths}`
                // );
            }

            naturalPaths = this.unitConventionService.numberWithCommas(
                parseInt(naturalPaths),
                this.unitConvention.thousandUnit
            );
            if (taithz && taithz.length > 0) {
                naturalPaths = `${naturalPaths}${this.unitConvention.decimalUnit}${taithz}`;
            }
            // (`Kết quả: ${naturalPaths}`);
            if (currElId && currElId.length > 0) {
                const currentEl = document.querySelector<any>(`#${currElId}`);
                const crrValue = currentEl.value;
                crrValue;
                if (
                    crrValue.length >= naturalPaths.length &&
                    !crrValue.endsWith(this.unitConvention.decimalUnit)
                ) {
                    currentEl.value = naturalPaths;
                }
            }
            return naturalPaths;
        } else {
            if (!val) {
                return '0.00';
            }
            let moneyFormat = '';
            this.unitConventionService.unitConvention.subscribe((res) => {
                if (Helper.isNumeric(val)) {
                    moneyFormat = Helper.convertMoney(
                        val,
                        Helper.THOUSAND_UNIT
                    );
                }
            });
            if (Helper.isNumeric(val)) {
                moneyFormat = Helper.convertMoney(val, Helper.THOUSAND_UNIT);
            }
            return moneyFormat;
        }
    }
}
