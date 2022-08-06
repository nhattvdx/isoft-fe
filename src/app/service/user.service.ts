import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page, TypeData } from '../models/common.model';
import AppConstant from '../utilities/app-constants';
import { User } from '../models/user.model';

export interface PageFilterUser extends Page {
    keyword?: string;
    warehouseId?: number;
    positionId?: number;
    departmentId?: number;
    requestPassword?: boolean;
    quit?: boolean;
    gender?: number;
    birthday?: Date;
    startDate?: Date;
    endDate?: Date;
    currentPage?: number;
    pagesize?: number;
    targetId?: number;
    typeOfWork?: number;
    month?: number;
    degreeId?: number;
    certificatedId?: number;
}

let _prefix = `${AppConstant.DEFAULT_URLS.API}/Users`;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly httpClient: HttpClient) {}

    public getPagingUser(params: any): Observable<TypeData<User>> {
        return this.httpClient.get(`${_prefix}`, { params }).pipe(
            map((user: TypeData<User>) => {
                return user;
            })
        );
    }

    public getAllUser(): Observable<TypeData<User>> {
        return this.httpClient.get(`${_prefix}/list`).pipe(
            map((user: TypeData<User>) => {
                return user;
            })
        );
    }

    public getUserDetail(id: number): Observable<User> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.get(url, {}).pipe(
            map((user: User) => {
                return user;
            })
        );
    }

    public createUser(user: User): Observable<User | null> {
        const url: string = `${_prefix}`;
        return this.httpClient.post(url, user).pipe(
            map((user: User) => {
                return user;
            })
        );
    }

    public updateUser(user: User, id: number): Observable<User> {
        console.log(user);
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.put(url, user).pipe(
            map((user: User) => {
                return user;
            })
        );
    }

    public deleteUser(id: number): Observable<User | null> {
        const url: string = `${_prefix}/${id}`;
        return this.httpClient.delete(url, {}).pipe(
            map((user: User) => {
                return user;
            })
        );
    }

    uploadFiles(formData): Observable<any> {
        return this.httpClient
            .post(`${_prefix}/uploadImage`, formData, {
                reportProgress: true,
                observe: 'events',
            })
            .pipe(catchError(this.errorMgmt));
    }

    deleteFiles(paths): Observable<any> {
        let data = [];
        for (let i = 0; i < paths.length; i++) {
            data.push({ imageUrl: paths[i] });
        }
        const url: string = `${_prefix}/deleteImages`;
        return this.httpClient.post(url, data).pipe(
            map((imageUrl: string) => {
                return imageUrl;
            })
        );
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getExcelReport(param: PageFilterUser): Observable<{ dt: string }> {
        let url: string = `${_prefix}/export-excel-user`;

        return this.httpClient.get(url).pipe(
            map((data: { dt: string }) => {
                return data;
            })
        );
    }

    getExcelReportUserWeb(param: PageFilterUser): Observable<{ dt: string }> {
        let url: string = `${_prefix}/export-excel-user-web`;

        return this.httpClient.get(url).pipe(
            map((data: { dt: string }) => {
                return data;
            })
        );
    }

    getExcelReportEmployerWeb(
        param: PageFilterUser
    ): Observable<{ dt: string }> {
        let url: string = `${_prefix}/export-excel-employer-web`;

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
        return this.httpClient.post(`${_prefix}/import-user`, formData).pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
