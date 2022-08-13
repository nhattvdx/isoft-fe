import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    CalculateTaxResponseModel,
    Page,
    TypeData,
} from '../models/common.model';
import { Ledger } from '../models/ledger.model';
import { TaxRate } from '../models/taxrate.model';
import AppConstant from '../utilities/app-constants';

@Injectable({
    providedIn: 'root',
})
export class TaxrateService {
    constructor(private readonly httpClient: HttpClient) {}
    private readonly _baseUrl = AppConstant.DEFAULT_URLS.API;
    public pagingParams: Page = {
        searchText: '',
        page: 0,
        pageSize: 20,
    };
    public createTaxRate(taxRate: TaxRate): Observable<TaxRate | null> {
        const url: string = '/TaxRates/create';
        return this.httpClient.post(url, taxRate).pipe(
            map((taxRate: TaxRate) => {
                return taxRate;
            })
        );
    }

    public updateTaxRate(updatingTaxRate: TaxRate): Observable<TaxRate | null> {
        const url: string = this._baseUrl + '/TaxRates/update';
        return this.httpClient.put(url, updatingTaxRate).pipe(
            map((updatedTaxRate: TaxRate) => {
                return updatedTaxRate;
            })
        );
    }

    public deleteTaxRate(taxRateID: number): Observable<TaxRate | null> {
        const url: string = this._baseUrl + `/TaxRates/delete/${taxRateID}`;
        return this.httpClient.delete(url, {}).pipe(
            map((updatedTaxRate: TaxRate) => {
                return updatedTaxRate;
            })
        );
    }

    public getAllTaxRates(page: Page): Observable<TypeData<TaxRate>> {
        const url: string = this._baseUrl + '/TaxRates/get';
        return this.httpClient.post(url, page).pipe(
            map((taxRates: TypeData<TaxRate>) => {
                return taxRates;
            })
        );
    }

    public getTaxRates(page: Page): Observable<TypeData<TaxRate>> {
        const url: string = this._baseUrl + '/TaxRates/get';
        return this.httpClient.post(url, page).pipe(
            map((taxRates: TypeData<TaxRate>) => {
                return taxRates;
            })
        );
    }

    public getTaxRateByCode(code: string): Observable<TypeData<TaxRate>> {
        const url: string = this._baseUrl + '/TaxRates/get-by-code/' + code;
        return this.httpClient.get(url).pipe(
            map((taxRates: TypeData<TaxRate>) => {
                return taxRates;
            })
        );
    }

    public calculateTax(param: Ledger): Observable<CalculateTaxResponseModel> {
        const url: string = this._baseUrl + '/TaxRates/calculatetax';
        return this.httpClient.post(url, param).pipe(
            map((tax: CalculateTaxResponseModel) => {
                return tax;
            })
        );
    }
}
