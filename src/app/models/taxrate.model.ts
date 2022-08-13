export interface TaxRate {
    id: number;
    code: string;
    name: string;
    percent: string;
    description: string;
    type: number;
    order: number;
    debitCode: string;
    debitCodeName: string;
    creditCode: string;
    creditCodeName: string;
    allowDelete: boolean
}
