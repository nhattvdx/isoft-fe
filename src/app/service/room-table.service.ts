import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RoomTable } from '../components/sell-module/setup-module/room-table/roomtable.model';
import { Page, TypeData } from '../models/common.model';
import AppConstant from '../utilities/app-constants';

export interface PageFilterBranch extends Page {}

let _prefix = `${AppConstant.DEFAULT_URLS.API}/DeskFloors`;

@Injectable({
    providedIn: 'root',
})
export class RoomTableService {
    constructor(private readonly httpClient: HttpClient) {}

    public getList(params): Observable<TypeData<RoomTable>> {
        return this.httpClient.get(`${_prefix}`, { params }).pipe(
            map((data: TypeData<RoomTable>) => {
                return data;
            })
        );
    }
    public getListNoQuery(): Observable<TypeData<RoomTable>> {
        return this.httpClient.get(`${_prefix}/getdeskfloor`).pipe(
            map((data: TypeData<RoomTable>) => {
                return data;
            })
        );
    }

    public getDetail(id: number): Observable<any> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.get(url, {}).pipe(
            map((res) => {
                return res;
            })
        );
    }

    public create(body): Observable<any> {
        const url: string = `${_prefix}`;
        return this.httpClient.post(url, body).pipe(
            map((res) => {
                return res;
            })
        );
    }

    public update(body, id: number): Observable<any> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.put(url, body).pipe(
            map((res) => {
                return res;
            })
        );
    }

    public deleteRoomTable(id: number): Observable<any> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.delete(url, {}).pipe(
            map((res) => {
                return res;
            })
        );
    }
}
