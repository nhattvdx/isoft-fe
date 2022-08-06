import { UserService, PageFilterUser } from '../../service/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColumnFilter, Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api'
import { TypeData } from 'src/app/models/common.model';
import { environment } from 'src/environments/environment';
import AppUtil from 'src/app/utilities/app-util';
import { User } from 'src/app/models/user.model';
import { District } from 'src/app/models/district.model';
import { Province } from 'src/app/models/province.model';
import { Ward } from 'src/app/models/ward.model';
import { TranslateService } from '@ngx-translate/core';
import AppConstant from 'src/app/utilities/app-constants';
import { Religion } from 'src/app/models/religion.model';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DepartmentService } from 'src/app/service/department.service';
import { Department } from 'src/app/models/department.model';

type AOA = any[][];

@Component({
    templateUrl: './department.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [
        `
            :host ::ng-deep .p-frozen-column {
                font-weight: bold;
            }

            :host ::ng-deep .p-datatable-frozen-tbody {
                font-weight: bold;
            }

            :host ::ng-deep .p-progressbar {
                height: 0.5rem;
            }
        `,
    ],
})
export class DepartmentComponent implements OnInit {
    public appConstant = AppConstant;
    @ViewChild('departmentForm') departmentFormComponent:
        | DepartmentFormComponent
        | undefined;

    loading: boolean = true;

    sortFields: any[] = [];
    sortTypes: any[] = [];

    first = 0;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    public getParams: PageFilterUser = {
        page: 1,
        pageSize: 5,
        sortField: 'id',
        isSort: true,
        searchText: ''
    };
    public totalRecords = 0;
    public totalPages = 0;
    public myTarget: number;

    public isLoading: boolean = false;

    public lstDepartments: Department[] = [];

    display: boolean = false;

    isMobile = screen.width <= 1199;

    formData: any = {};
    isEdit: boolean = false;
    isReset: boolean = false;

    pendingRequest: any;

    districts: District[] = [];
    provinces: Province[] = [];
    wards: Ward[] = [];
    roles: any[] = [];

    constructor(
        private messageService: MessageService,
        private readonly departmentService: DepartmentService,
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

    formatCurrency(value) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            this.getDepartments();
        }
    }

    onChangeSort(event, type) {
        if (type === 'sortType') {
            this.getParams.isSort = event.value;
        }
        this.getDepartments();
    }

    clearFilter(columnFilter: ColumnFilter, field: string) {
        columnFilter.clearFilter();
    }

    getDepartments(event?: any, isExport: boolean = false): void {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.loading = true;
        if (event) {
            this.getParams.page = event.first / event.rows + 1;
            this.getParams.pageSize = event.rows;
        }
        // if (isExport) {
        //     this.religionService
        //         .getExcelReport(this.getParams)
        //         .subscribe((res: any) => {
        //             AppUtil.scrollToTop();
        //             this.openDownloadFile(res.data, 'excel');
        //         });
        // }
        // remove undefined value
        Object.keys(this.getParams).forEach(
            (k) => this.getParams[k] == null && delete this.getParams[k]
        );
        console.log('this params', this.getParams);
        this.pendingRequest = this.departmentService
            .getListDepartment(this.getParams)
            .subscribe((response: TypeData<Department>) => {
                AppUtil.scrollToTop();
                this.lstDepartments = response.data;
                this.totalRecords = response.totalItems || 0;
                this.totalPages = response.totalItems / response.pageSize + 1;
                this.loading = false;
            });
    }

    getDetail(departmentId) {
        this.departmentService
            .getDepartmentDetail(departmentId)
            .subscribe((response: Department) => {
                this.formData = response;
                this.isEdit = true;
                this.showDialog();
            });
    }

    onDelete(departmentId) {
        let message;
        this.translateService
            .get('question.delete_department_content')
            .subscribe((res) => {
                message = res;
            });
        this.confirmationService.confirm({
            message: message,
            accept: () => {
                this.departmentService
                    .deleteDepartment(departmentId)
                    .subscribe((response: any) => {
                        this.getDepartments();
                    });
            },
        });
    }

    baseUrlImage(image) {
        return `${environment.serverURL}/${image}`;
    }

    showDialog() {
        this.departmentFormComponent.onReset();
        this.display = true;
    }
}
