import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TypeData } from 'src/app/models/common.model';
import { environment } from 'src/environments/environment';
import AppUtil from 'src/app/utilities/app-util';
import { TranslateService } from '@ngx-translate/core';
import AppConstant from 'src/app/utilities/app-constants';
import {
    DepartmentService,
    PageFilterDepartment,
} from 'src/app/service/department.service';
import { Department } from 'src/app/models/department.model';
import { RoomTableFormComponent } from './room-table-form/room-table-form.component';
import { RoomTableService } from 'src/app/service/room-table.service.';
import { RoomTable } from 'src/app/models/room-table.model';
@Component({
    selector: 'app-room-table',
    templateUrl: './room-table.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [``],
})
export class RoomTableComponent implements OnInit {
    public appConstant = AppConstant;
    @ViewChild('roomTableForm') roomTableFormComponent:
        | RoomTableFormComponent
        | undefined;

    loading: boolean = true;

    sortFields: any[] = [];
    sortTypes: any[] = [];

    first = 0;

    public getParams: PageFilterDepartment = {
        page: 1,
        pageSize: 5,
        sortField: 'id',
        isSort: true,
        searchText: '',
    };
    public totalRecords = 0;
    public totalPages = 0;

    public isLoading: boolean = false;
    public lstDepartments: Department[] = [];

    display: boolean = false;
    isMobile = screen.width <= 1199;

    formData: any = {};
    isEdit: boolean = false;

    pendingRequest: any;

    roles: any[] = [];

    constructor(
        private messageService: MessageService,
        private readonly roomTableService: RoomTableService,
        private readonly translateService: TranslateService,
        private readonly confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        AppUtil.getUserSortTypes(this.translateService).subscribe((res) => {
            this.sortFields = res;
        });
        AppUtil.getSortTypes(this.translateService).subscribe((res) => {
            this.sortTypes = res;
        });
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            this.getRoomTables();
        }
    }

    getRoomTables(event?: any, isExport: boolean = false): void {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.loading = true;
        if (event) {
            this.getParams.page = event.first / event.rows + 1;
            this.getParams.pageSize = event.rows;
        }
        if (isExport) {
            this.roomTableService
                .getExcelReport(this.getParams)
                .subscribe((res: any) => {
                    AppUtil.scrollToTop();
                    this.openDownloadFile(res.data, 'excel');
                });
        }
        // remove undefined value
        Object.keys(this.getParams).forEach(
            (k) => this.getParams[k] == null && delete this.getParams[k]
        );
        console.log('this params', this.getParams);
        this.pendingRequest = this.roomTableService
            .getListRoomTable(this.getParams)
            .subscribe((response: TypeData<RoomTable>) => {
                AppUtil.scrollToTop();
                this.lstDepartments = response.data;
                this.totalRecords = response.totalItems || 0;
                this.totalPages = response.totalItems / response.pageSize + 1;
                this.loading = false;
            });
    }

    getDetail(roomTableId) {
        this.roomTableService
            .getRoomTableDetail(roomTableId)
            .subscribe((response: RoomTable) => {
                this.formData = response;
                this.isEdit = true;
                this.showDialog();
            });
    }

    private openDownloadFile(_fileName: string, _ft: string) {
        try {
            this.isLoading = false;
            var _l = this.roomTableService.getFolderPathDownload(
                _fileName,
                _ft
            );
            if (_l) window.open(_l);
        } catch (ex) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: 'File invalid',
            });
        }
    }

    onDelete(roomTableId) {
        let message;
        this.translateService
            .get('question.delete_room_table_content')
            .subscribe((res) => {
                message = res;
            });
        this.confirmationService.confirm({
            message: message,
            accept: () => {
                this.roomTableService
                    .deleteRoomTable(roomTableId)
                    .subscribe((response: any) => {
                        this.getRoomTables();
                    });
            },
        });
    }

    baseUrlImage(image) {
        return `${environment.serverURL}/${image}`;
    }

    showDialog() {
        this.roomTableFormComponent.onReset();
        this.display = true;
    }
}
