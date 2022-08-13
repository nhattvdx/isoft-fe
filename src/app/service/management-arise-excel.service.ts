import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    AriseExcelSearch,
    AriseUpdateOrginalVoucherRequest,
    TransferModel,
} from '../models/arise-search.model';
import { Ledger } from '../models/ledger.model';
import AppConstant from '../utilities/app-constants';
import { BroadcasterService } from './broadcaster.service';

@Injectable({
    providedIn: 'root',
})
export class ManagementAriseExcelService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly broadcasterService: BroadcasterService
    ) {}
    private readonly _baseUrl = AppConstant.DEFAULT_URLS.API;
    /** Thay đổi loại chứng từ hoặc tháng */
    public getDebitAndCreditAccount(): Observable<any> {
        const url: string =
            this._baseUrl + '/ManagementAriesExcel/getDebitAndCreditAccount';
        return this.httpClient.get(url);
    }

    /** Thay đổi loại chứng từ hoặc tháng */
    public transferInfoLedger(request: TransferModel): Observable<any> {
        const url: string =
            this._baseUrl + '/ManagementAriesExcel/transferInfoLedger';
        return this.httpClient.post(url, request);
    }

    /** Cập nhật OrginalVoucherNumber theo khoảng tháng chọn */
    public updateOrginalVoucherNumber(
        request: AriseUpdateOrginalVoucherRequest
    ): Observable<any> {
        const url: string =
            this._baseUrl + '/ManagementAriesExcel/updateOrginalVoucherNumber';
        return this.httpClient.post(url, request);
    }

    /** Lấy Ledger cuối cùng của tháng */
    public getLastVoucherNumberInMonth(
        request: AriseExcelSearch
    ): Observable<Ledger> {
        const url: string =
            this._baseUrl + '/ManagementAriesExcel/getLastVoucherNumberInMonth';
        return this.httpClient.post(url, request).pipe(
            map((ledger: Ledger) => {
                return ledger;
            })
        );
    }

    /** Xuất file dữ liệu */
    public exportArise(request: AriseExcelSearch): Observable<Blob> {
        const url: string = this._baseUrl + '/ManagementAriesExcel/exportAries';
        return this.httpClient.post(url, request, { responseType: 'blob' });
    }

    /** Xuất file dữ liệu */
    public importArise(request: AriseExcelImportModel): Observable<any> {
        const url: string = this._baseUrl + '/ManagementAriesExcel/importExcel';
        return this.httpClient.post(url, request);
    }

    public transferAddInfoLedger(request: TransferModel): Observable<any> {
        const url: string = this._baseUrl + '/Ledger/TransferAddLedger';
        return this.httpClient.post(url, request);
    }

    public TransferInfoLedgerLuong(request: TransferModel): Observable<any> {
        const url: string =
            this._baseUrl + '/ManagementAriesExcel/TransferInfoLedgerLuong';
        return this.httpClient.post(url, request);
    }
}
export class AriseExcelImportModel {
    year?: number;
    month?: number;
    ledgers?: Ledger[];
}
