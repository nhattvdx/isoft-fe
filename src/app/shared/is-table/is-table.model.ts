import { NameValueOfInt } from "src/app/models/common.model";

export enum IsTableColumnType {
    Expand = 1,
    AccountAction
}

export interface IIsTableColumn {
    header?: string;
    field: string;
    isSortable?: boolean;
    styleClass?: string;
    type?: IsTableColumnType;
    innerFields?: string[];
}

export class IsTableColumn implements IIsTableColumn {

    header?: string;
    field: string;
    isSortable?: boolean;
    styleClass?: string;
    type?: IsTableColumnType;
    innerFields?: string[];

    constructor(data?: IIsTableColumn) {
        if (data) {
            for (let prop in data) {
                if (data.hasOwnProperty(prop)) {
                    this[prop] = data[prop];
                }
            }
        }
    }
}

export enum ExcelActionType {
    Export = 1,
    Import
}

export const ExcelActionTypeList: NameValueOfInt[] = [
    {
        name: 'label.export',
        value: ExcelActionType.Export
    },
    {
        name: 'label.import',
        value: ExcelActionType.Import
    },
];