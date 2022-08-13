import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Page, TypeData } from '../models/common.model';
import { CustomActionResult } from '../models/custom-action-result.model';
import { Description } from '../models/description.model';
import AppConstant from '../utilities/app-constants';
import { Helper } from '../utilities/helper.help';
import { BroadcasterService } from './broadcaster.service';

@Injectable({
    providedIn: 'root',
})
export class DescriptionService {
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

    public getAllDescription(
        descriptionName: string
    ): Observable<TypeData<Description>> {
        const url: string = this._baseUrl + '/Descriptions/get-page';
        var currentPagingParams = this.pagingParams;
        currentPagingParams.pageSize = -1;
        currentPagingParams.searchText = descriptionName;
        return this.httpClient.post(url, currentPagingParams).pipe(
            map(
                (descriptions: TypeData<Description>) => {
                    return descriptions;
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

    public createDescription(
        description: Description
    ): Observable<CustomActionResult<Description>> {
        const url: string = this._baseUrl + '/Descriptions/create';
        return this.httpClient.post(url, description).pipe(
            map(
                (response: CustomActionResult<Description>) => {
                    return response;
                },
                () => {
                    //
                }
            )
        );
    }

    public updateDescription(
        description: Description
    ): Observable<CustomActionResult<Description>> {
        const url: string = this._baseUrl + '/Descriptions/update';
        return this.httpClient.put(url, description).pipe(
            map(
                (response: CustomActionResult<Description>) => {
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

    public deletePayer(
        descriptionId: number
    ): Observable<CustomActionResult<Description>> {
        const url: string =
            this._baseUrl + `/Descriptions/delete/${descriptionId}`;
        return this.httpClient.delete(url, {}).pipe(
            map((response: CustomActionResult<Description>) => {
                return response;
            })
        );
    }

    public deleteManyPayer(Ids): Observable<Description | null> {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        const url: string = this._baseUrl + '/Descriptions/delete-many';
        return this.httpClient.post(url, Ids).pipe(
            map(
                (response: Description) => {
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

    public validateDescription(description: Description): string {
        if (description.name.trim() === '') {
            return 'Vui lòng nhập tên diễn giải';
        }
        if (description.debitCode.trim() === '') {
            return 'Vui lòng nhập T.K nợ';
        }
        if (description.creditCode.trim() === '') {
            return 'Vui lòng nhập T.K có';
        }
        // if(description.debitDetailCodeFirst.trim() === ""){
        //   return "Vui lòng nhập chi tiết nợ 1";
        // }
        // if(description.debitDetailCodeSecond.trim() === ""){
        //   return "Vui lòng nhập chi tiết nợ 2";
        // }
        // if(description.creditDetailCodeFirst.trim() === ""){
        //   return "Vui lòng nhập chi tiết có 1";
        // }
        // if(description.creditDetailCodeSecond.trim() === ""){
        //   return "Vui lòng nhập chi tiết có 2";
        // }
        return null;
    }
}
