import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page, TypeData } from '../models/common.model';
import AppConstant from '../utilities/app-constants';
import { AccountGroupDetailModel } from '../models/account-group.model';

let _prefix = `${AppConstant.DEFAULT_URLS.API}/ChartOfAccounts`;

@Injectable({
    providedIn: 'root',
})
export class AccountGroupService {
    mockData = true;

    constructor(private readonly httpClient: HttpClient) {}

    getListDetail(params: any): Observable<TypeData<AccountGroupDetailModel>> {
        const data$ = of(<TypeData<any>>{
            data: [{
                "id": 1,
                "code": "111",
                "name": "Tiền mặt",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 1,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": false,

                "displayDelete": false,


                "parentRef": "",
                "hasChild": true,
                "hasDetails": false,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": null,
                "openingCreditNB": null,
                "openingForeignDebitNB": null,
                "openingForeignCreditNB": null
            }, {
                "id": 2,
                "code": "1111",
                "name": "Tiền Việt Nam",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 2,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": true,

                "displayDelete": true,


                "parentRef": "111",
                "hasChild": false,
                "hasDetails": false,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": null,
                "openingCreditNB": null,
                "openingForeignDebitNB": null,
                "openingForeignCreditNB": null
            }, {
                "id": 3,
                "code": "1112",
                "name": "Ngoại tệ",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 2,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": true,

                "displayDelete": true,


                "parentRef": "111",
                "hasChild": false,
                "hasDetails": false,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": null,
                "openingCreditNB": null,
                "openingForeignDebitNB": null,
                "openingForeignCreditNB": null
            }, {
                "id": 24,
                "code": "1332",
                "name": "Thuế GTGT được khấu trừ của TSCĐ",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 1,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": true,

                "displayDelete": false,


                "parentRef": "133",
                "hasChild": true,
                "hasDetails": true,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": 0,
                "openingCreditNB": 0,
                "openingForeignDebitNB": 0,
                "openingForeignCreditNB": 0
            }, {
                "id": 11,
                "code": "1132",
                "name": "Ngoại tệ",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 2,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": true,

                "displayDelete": true,


                "parentRef": "113",
                "hasChild": false,
                "hasDetails": false,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": null,
                "openingCreditNB": null,
                "openingForeignDebitNB": null,
                "openingForeignCreditNB": null
            }, {
                "id": 12,
                "code": "121",
                "name": "Chứng khoán kinh doanh",
                "openingDebit": 0,
                "openingCredit": 0,
                "arisingDebit": 0,
                "arisingCredit": 0,



                "isForeignCurrency": false,

                "arisingForeignDebit": 0,
                "arisingForeignCredit": 0,
                "openingForeignDebit": 0,
                "openingForeignCredit": 0,

                "type": 1,
                "classification": 1,
                "accGroup": 1,
                "duration": "N",
                "isProtected": false,
                "displayInsert": false,

                "displayDelete": false,


                "parentRef": "",
                "hasChild": true,
                "hasDetails": false,




                "stockUnitPrice": null,
                "stockUnit": null,
                "warehouseCode": null,
                "openingStockQuantity": null,


                "openingStockQuantityNB": null,
                "stockUnitPriceNB": null,
                "openingDebitNB": null,
                "openingCreditNB": null,
                "openingForeignDebitNB": null,
                "openingForeignCreditNB": null
            }],
        });

        const request$ = this.mockData ? data$ : this.httpClient.get(`${_prefix}`, {params});
        
        return request$.pipe(
            map((data: TypeData<AccountGroupDetailModel>) => {
                return data;
            })
        );
    }

    getListDetailForChildNode(parentCode: string, params: any) : Observable<TypeData<any>> {

        const data$ = of(<TypeData<any>>{
            data: [
                <AccountGroupDetailModel>{
                    "id": 238,
                    "code": "CAFE",
                    "name": "Cà phê",
                    "openingDebit": 0,
                    "openingCredit": 0,
                    "arisingDebit": 0,
                    "arisingCredit": 0,
    
    
    
                    "isForeignCurrency": false,
    
                    "arisingForeignDebit": 0,
                    "arisingForeignCredit": 0,
                    "openingForeignDebit": 0,
                    "openingForeignCredit": 0,
    
                    "type": 5,
                    "classification": 1,
                    "accGroup": 1,
                    "duration": "N",
                    "isProtected": false,
                    "displayInsert": true,
    
                    "displayDelete": false,
    
    
                    "parentRef": "1332",
                    "hasChild": true,
                    "hasDetails": false,
    
    
    
    
                    "stockUnitPrice": null,
                    "stockUnit": null,
                    "warehouseCode": null,
                    "openingStockQuantity": null,
    
    
                    "openingStockQuantityNB": null,
                    "stockUnitPriceNB": null,
                    "openingDebitNB": 0,
                    "openingCreditNB": 0,
                    "openingForeignDebitNB": 0,
                    "openingForeignCreditNB": 0
                },
                <AccountGroupDetailModel>{
                    "id": 240,
                    "code": "SUA",
                    "name": "Sửa",
                    "openingDebit": 0,
                    "openingCredit": 0,
                    "arisingDebit": 0,
                    "arisingCredit": 0,
                    "closingDebit": 0,
                    "closingCredit": 0,
                    "currency": "",
                    "isForeignCurrency": false,
                    "exchangeRate": null,
                    "arisingForeignDebit": 0,
                    "arisingForeignCredit": 0,
                    "openingForeignDebit": 0,
                    "openingForeignCredit": 0,
                    "isSpendAccount": false,
                    "type": 5,
                    "classification": 1,
                    "accGroup": 1,
                    "duration": "N",
                    "isProtected": false,
                    "displayInsert": true,
                    "displayUpdate": true,
                    "displayDelete": true,
                    "description": "",
                    "parentId": null,
                    "parentRef": "1332",
                    "hasChild": false,
                    "hasDetails": false,
                    "minimumStockQuantity": null,
                    "maximumStockQuantity": null,
                    "stockCostPrice": null,
                    "stockSellingPrice": null,
                    "stockUnitPrice": null,
                    "stockUnit": null,
                    "warehouseCode": null,
                    "openingStockQuantity": null,
                    "closingForeignCredit": 0,
                    "closingForeignDebit": 0,
                    "openingStockQuantityNB": null,
                    "stockUnitPriceNB": null,
                    "openingDebitNB": null,
                    "openingCreditNB": null,
                    "openingForeignDebitNB": null,
                    "openingForeignCreditNB": null
                }
            ],
        });
        
        const request$ = this.mockData ? data$ : this.httpClient.get(`${_prefix}/details/${parentCode}`, {params});
        
        return request$.pipe(
            map((data: TypeData<AccountGroupDetailModel>) => {
                return data;
            })
        );
    }
}
