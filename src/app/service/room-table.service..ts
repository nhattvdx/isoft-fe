import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page, TypeData } from '../models/common.model';
import AppConstant from '../utilities/app-constants';
import { RoomTable } from '../models/room-table.model';

export interface PageFilterRoomTable extends Page {
    status: string;
}

let _prefix = `${AppConstant.DEFAULT_URLS.API}/DeskFloors`;

@Injectable({
    providedIn: 'root',
})
export class RoomTableService {
    constructor(private readonly httpClient: HttpClient) {}

    public getListRoomTable(params: any): Observable<TypeData<RoomTable>> {
        return this.httpClient.get(`${_prefix}`, { params }).pipe(
            map((roomTable: TypeData<RoomTable>) => {
                return roomTable;
            })
        );
    }

    public getAllRoomTable(): Observable<TypeData<RoomTable>> {
        return this.httpClient.get(`${_prefix}/list`).pipe(
            map((roomTable: TypeData<RoomTable>) => {
                return roomTable;
            })
        );
    }

    public getRoomTableDetail(id: number): Observable<RoomTable> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.get(url, {}).pipe(
            map((roomTable: RoomTable) => {
                return roomTable;
            })
        );
    }

    public createRoomTable(RoomTable: RoomTable): Observable<RoomTable | null> {
        const url: string = `${_prefix}`;
        return this.httpClient.post(url, RoomTable).pipe(
            map((roomTable: RoomTable) => {
                return roomTable;
            })
        );
    }

    public updateRoomTable(RoomTable: RoomTable, id: number): Observable<RoomTable> {
        console.log(RoomTable);
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.put(url, RoomTable).pipe(
            map((roomTable: RoomTable) => {
                return roomTable;
            })
        );
    }

    public deleteRoomTable(id: number): Observable<RoomTable | null> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.delete(url, {}).pipe(
            map((roomTable: RoomTable) => {
                return roomTable;
            })
        );
    }

    getExcelReport(param: PageFilterRoomTable): Observable<{ dt: string }> {
        let url: string = `${_prefix}/export-excel-RoomTable`;

        return this.httpClient.get(url).pipe(
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

    importExcel(formData): Observable<any> {
        return this.httpClient.post(`${_prefix}/import-RoomTable`, formData).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
