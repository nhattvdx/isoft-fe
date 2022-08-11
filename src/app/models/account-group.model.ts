import { Page } from "./common.model";

export class AccountGroupDetailModel {
    "id": number;
    "code": string;
    "name": string;
    "openingDebit": number;
    "openingCredit": number;
    "arisingDebit": number;
    "arisingCredit": number;
    "isForeignCurrency": boolean;
    "arisingForeignDebit": number;
    "arisingForeignCredit": number;
    "openingForeignDebit": number;
    "openingForeignCredit": number;
    "type": number;
    "classification": number;
    "accGroup": number;
    "duration": string;
    "isProtected": boolean;
    "displayInsert": boolean;
    "displayDelete": boolean;
    "parentRef": string;
    "hasChild": boolean;
    "hasDetails": boolean;
    "stockUnitPrice": number;
    "stockUnit": string;
    "warehouseCode": string;
    "openingStockQuantity": number;
    "openingStockQuantityNB": number;
    "stockUnitPriceNB": number;
    "openingDebitNB": number;
    "openingCreditNB": number;
    "openingForeignDebitNB": number;
    "openingForeignCreditNB": number;

    constructor() {}
}

export interface AccountGroupDetailForChildParams extends Page {
    warehouseCode: string;
}