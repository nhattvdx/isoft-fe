import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({ name: "convertTimeByFormat", pure: false })
export class ConvertTimeByFormatPipe implements PipeTransform {
    constructor() {}
    transform(val: string): string {
        return moment(val, "HH:mm").format('hh:mm A');
    }
}
