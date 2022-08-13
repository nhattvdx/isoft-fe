import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "convertTimeValue", pure: false })
export class ConvertTimeValuePipe implements PipeTransform {
    constructor() {}
    transform(val: string): string {
        let timeValue: string = "";
        if (val && val.length > 0) {
            const timeKeepVal = JSON.parse(val);
            timeValue = timeKeepVal.map((x) => x.value).join(", ");
        }
        return timeValue;
    }
}
