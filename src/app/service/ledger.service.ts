import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LedgerRequestModel, TypeData } from '../models/common.model';
import { CustomActionResult } from '../models/custom-action-result.model';
import {
    FinalStandardDetailModel,
    FinalStandardToLedgerModel,
} from '../models/final-standard.model';
import { LedgerCostOfGoods } from '../models/ledger-cost-of-goods.model';
import { Ledger } from '../models/ledger.model';
import { Helper } from '../utilities/helper.help';
import { BroadcasterService } from './broadcaster.service';
import {
    LedgerSheetReportDto,
    RegisterReceiptSheetReportDto,
} from '../models/ledger-report.dto';
import AppConstant from '../utilities/app-constants';

@Injectable({
    providedIn: 'root',
})
export class LedgerService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly broadcasterService: BroadcasterService
    ) {}
    private readonly _baseUrl = AppConstant.DEFAULT_URLS.API;
    public getLedgerCollection(
        request: LedgerRequestModel
    ): Observable<TypeData<Ledger>> {
        const url: string = this._baseUrl + '/Ledgers';
        return this.httpClient.get(url, { params: { ...request } }).pipe(
            map((ledgers: TypeData<Ledger>) => {
                return ledgers;
            })
        );
    }

    public createLedger(
        ledger: Ledger
    ): Observable<CustomActionResult<Ledger>> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Ledgers/create';
        ledger;
        return this.httpClient.post(url, ledger).pipe(
            map(
                (response: CustomActionResult<Ledger>) => {
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

    public validateLedger(
        ledger: Ledger,
        isMustInputDebitSecondDetail: boolean,
        isMustInputCreditSecondDetail: boolean
    ): string {
        if (!ledger.debitCode?.trim()) {
            return 'Vui lòng nhập t.k nợ';
        }
        if (!ledger.creditCode?.trim()) {
            return 'Vui lòng nhập T.K có';
        }
        if (!ledger.orginalVoucherNumber?.trim()) {
            return 'Vui lòng nhập mã';
        }
        if (
            isMustInputDebitSecondDetail &&
            !ledger.debitDetailCodeSecond?.trim()
        ) {
            return 'Vui lòng nhập chi tiết nợ 2';
        }
        if (
            isMustInputCreditSecondDetail &&
            !ledger.creditDetailCodeSecond?.trim()
        ) {
            return 'Vui lòng nhập chi tiết có 2';
        }

        return null;
    }

    public deleteLedger(Ids): Observable<Ledger | null> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Ledgers/delete';
        return this.httpClient.post(url, Ids).pipe(
            map(
                (response: Ledger) => {
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

    public editOrderLedger(model): void {
        const url: string = this._baseUrl + '/Ledgers/edit-order';
        this.httpClient.post<any>(url, model).subscribe({
            next: (data) => {
                data;
            },
            error: (error) => {
                console.error('There was an error!', error);
            },
        });
    }

    voucherSheetReportExport(
        params: LedgerSheetReportDto,
        isNoiBo = false
    ): Observable<{ dt: string }> {
        if (params.fromDate) {
            params.fromDate = params.fromDate.toISOString() as any;
        }
        if (params.toDate) {
            params.toDate = params.toDate.toISOString() as any;
        }
        const url =
            this._baseUrl + '/Ledgers/get-report-ledger?isNoiBo=' + isNoiBo;
        return this.httpClient.post(url, params).pipe(
            map((data: { dt: string }) => {
                return data;
            })
        );
    }

    registerReceiptSheetReportExport(
        params: RegisterReceiptSheetReportDto,
        isNoiBo = false
    ): Observable<{ dt: string }> {
        if (params.fromDate) {
            params.fromDate = params.fromDate.toISOString() as any;
        }
        if (params.toDate) {
            params.toDate = params.toDate.toISOString() as any;
        }
        const url =
            this._baseUrl +
            '/Ledgers/get-report-dkctgs-ledger?isNoiBo=' +
            isNoiBo;
        return this.httpClient.post(url, params).pipe(
            map((data: { dt: string }) => {
                return data;
            })
        );
    }

    soChiTietSheetReportExport(
        params: RegisterReceiptSheetReportDto,
        isNoiBo = false
    ): Observable<{ dt: string }> {
        if (params.fromDate) {
            params.fromDate = params.fromDate.toISOString() as any;
        }
        if (params.toDate) {
            params.toDate = params.toDate.toISOString() as any;
        }
        const url =
            this._baseUrl + '/Ledgers/get-report-sct-ledger?isNoiBo=' + isNoiBo;
        return this.httpClient.post(url, params).pipe(
            map((data: { dt: string }) => {
                return data;
            })
        );
    }

    getFolderPathDownload(f: string, t: string): string {
        var k =
            environment.serverURL +
            '/ReportDownload/DownloadReportFromFile' +
            `?filename=${f}&fileType=${t}`;
        return k;
    }

    public getCostOfGoodsCollection(
        param: LedgerRequestModel
    ): Observable<TypeData<LedgerCostOfGoods>> {
        const url: string =
            this._baseUrl +
            '/Ledgers/get-cost-of-goods-page' +
            `?FilterMonth=${param.filterMonth}&page=${param.page}&_pageSize=${param.pageSize}`;
        return this.httpClient.get(url).pipe(
            map((entites: TypeData<LedgerCostOfGoods>) => {
                return entites;
            })
        );
    }

    public createCostOfGoods(
        entites: Array<LedgerRequestModel>
    ): Observable<CustomActionResult<LedgerCostOfGoods>> {
        //this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Ledgers/create-cost-of-goods';

        return this.httpClient.post(url, entites).pipe(
            map(
                (response: CustomActionResult<LedgerCostOfGoods>) => {
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

    public checkExistFinalStandard(
        entites: Array<FinalStandardDetailModel>
    ): Observable<CustomActionResult<Array<FinalStandardDetailModel>>> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Ledgers/CheckExistFinalStandard';

        return this.httpClient.post(url, entites).pipe(
            map(
                (
                    response: CustomActionResult<
                        Array<FinalStandardDetailModel>
                    >
                ) => {
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

    public updateFinalStandard(
        entites: FinalStandardToLedgerModel
    ): Observable<CustomActionResult<FinalStandardDetailModel>> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Ledgers/UpdateFinalStandard';

        return this.httpClient.post(url, entites).pipe(
            map(
                (response: CustomActionResult<FinalStandardDetailModel>) => {
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
}
