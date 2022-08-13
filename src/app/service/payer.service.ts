import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Page, TypeData } from '../models/common.model';
import { CustomActionResult } from '../models/custom-action-result.model';
import { Payer } from '../models/payer.model';
import AppConstant from '../utilities/app-constants';
import { Helper } from '../utilities/helper.help';
import { BroadcasterService } from './broadcaster.service';

@Injectable({
    providedIn: 'root',
})
export class PayerService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly broadcasterService: BroadcasterService
    ) {}
    private readonly _baseUrl = AppConstant.DEFAULT_URLS.API;
    public pagingParams: Page = {
        page: 0,
        pageSize: 20,
        searchText: '',
    };

    public createPayer(payer: Payer): Observable<CustomActionResult<Payer>> {
        const url: string = this._baseUrl + '/Payer/create';
        payer.payerType = 1;
        return this.httpClient.post(url, payer).pipe(
            map(
                (response: CustomActionResult<Payer>) => {
                    return response;
                },
                () => {
                    //
                }
            )
        );
    }

    public createCompany(payer: Payer): Observable<CustomActionResult<Payer>> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Payer/create';
        payer.payerType = 2;
        return this.httpClient.post(url, payer).pipe(
            map(
                (response: CustomActionResult<Payer>) => {
                    return response;
                },
                () => {
                    this.broadcasterService.broadcast(
                        Helper.GLOBAL_LOADING,
                        false
                    );
                }
            )
        );
    }

    public updatePayer(
        updatingPayer: Payer
    ): Observable<CustomActionResult<Payer>> {
        const url: string = this._baseUrl + '/Payer/update';
        return this.httpClient.put(url, updatingPayer).pipe(
            map((response: CustomActionResult<Payer>) => {
                return response;
            })
        );
    }

    public deletePayer(payerId: number): Observable<CustomActionResult<Payer>> {
        const url: string = this._baseUrl + `/Payer/delete/${payerId}`;
        return this.httpClient.delete(url, {}).pipe(
            map((response: CustomActionResult<Payer>) => {
                return response;
            })
        );
    }

    public deleteManyPayer(Ids): Observable<Payer | null> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Payer/delete-many';
        return this.httpClient.post(url, Ids).pipe(
            map(
                (response: Payer) => {
                    return response;
                },
                () => {
                    this.broadcasterService.broadcast(
                        Helper.GLOBAL_LOADING,
                        false
                    );
                }
            )
        );
    }

    public getAllPayer(payerName: string): Observable<TypeData<Payer>> {
        const url: string = this._baseUrl + '/Payer/get-page';
        var currentPaging = this.pagingParams;
        currentPaging.pageSize = -1;
        currentPaging.searchText = payerName;
        return this.httpClient.post(url, currentPaging).pipe(
            map((payers: TypeData<Payer>) => {
                return payers;
            })
        );
    }

    public getTaxCodes(taxCodes: string): Observable<TypeData<Payer>> {
        const url: string = this._baseUrl + '/Payer/get-taxt-codes';
        var currentPaging = this.pagingParams;
        currentPaging.searchText = taxCodes;
        return this.httpClient.post(url, currentPaging).pipe(
            map((payers: TypeData<Payer>) => {
                return payers;
            })
        );
    }

    public validatePayer(payer: Payer): string {
        if (payer.name.trim() === '') {
            return 'Vui lòng nhập tên người nộp';
        }
        if (payer.address.trim() === '') {
            return 'Vui lòng nhập địa chỉ người nộp';
        }
        return null;
    }
    public validateCompany(payer: Payer): string {
        if (payer.taxCode.trim() === '') {
            return 'Vui lòng nhập mã số thuế';
        }
        if (payer.name.trim() === '') {
            return 'Vui lòng nhập tên đơn vị';
        }
        if (payer.address.trim() === '') {
            return 'Vui lòng nhập địa chỉ';
        }
        return null;
    }
}
