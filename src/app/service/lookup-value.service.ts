import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    LookupValueModel,
    ServerLookupValueModel,
} from '../models/lookup-value.model';
import AppConstant from '../utilities/app-constants';
@Injectable({
    providedIn: 'root',
})
export class LookupValueService {
    constructor(private readonly http: HttpClient) {}
    private readonly _baseUrl = AppConstant.DEFAULT_URLS.API;
    getLookupValues(scope: string): Observable<LookupValueModel[]> {
        return this.http
            .get(this._baseUrl + `/lookupvalues?scope=${scope}`)
            .pipe(
                map((data: ServerLookupValueModel[]) => {
                    let tempData: LookupValueModel[] = [];
                    tempData = data.map((x) => {
                        const value = {
                            id: x.id,
                            code: +x.code,
                            value: x.value,
                        };
                        return value;
                    });
                    return tempData;
                })
            );
    }
}
