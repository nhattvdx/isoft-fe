import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColumnFilter, Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api'
import { TypeData } from 'src/app/models/common.model';
import { environment } from 'src/environments/environment';
import AppUtil from 'src/app/utilities/app-util';
import { User } from 'src/app/models/user.model';
import { DistrictService } from 'src/app/service/district.service';
import { District } from 'src/app/models/district.model';
import { ProvinceService } from 'src/app/service/province.service';
import { WardService } from 'src/app/service/ward.service';
import { Province } from 'src/app/models/province.model';
import { Ward } from 'src/app/models/ward.model';
import { TranslateService } from '@ngx-translate/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import AppConstant from 'src/app/utilities/app-constants';
import { AuthService } from 'src/app/service/auth.service';
import { PageFilterUser, UserService } from 'src/app/service/user.service';
import { UserRoleService } from 'src/app/service/user-role.service';
import { BranchService } from 'src/app/service/branch.service';
import { MajorService } from 'src/app/service/major.service';
import { StoreService } from 'src/app/service/store.service';
import { PositionDetailService } from 'src/app/service/position-detail.service';
import { TargetService } from 'src/app/service/target.service';
import { SymbolService } from 'src/app/service/symbol.service';
import { ContractTypeService } from 'src/app/service/contract-type.service';

type AOA = any[][];

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../../assets/demo/badges.scss'],
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
export class UserComponent implements OnInit {
    public appConstant = AppConstant;
    @ViewChild('userForm') userFormComponent: UserFormComponent | undefined;

    loading: boolean = true;

    sortFields: any[] = [];
    sortTypes: any[] = [];

    pendingRequest: any;

    first = 0;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    public getParams: PageFilterUser = {
        page: 1,
        pageSize: 5,
        sortField: 'id',
        isSort: true,
        keyword: '',
    };
    public totalRecords = 0;
    public totalPages = 0;
    public myTarget: number;

    public isLoading: boolean = false;

    public lstUsers: User[] = [];

    display: boolean = false;

    isMobile = screen.width <= 1199;

    formData: any = {};
    isEdit: boolean = false;
    isReset: boolean = false;

    districts: District[] = [];
    provinces: Province[] = [];
    nativeProvinces: Province[] = [];
    wards: Ward[] = [];
    roles: any[] = [];
    branches: any[] = [];
    majors: any[] = [];
    warehouses: any[] = [];
    positionDetails: any[] = [];
    targets: any[] = [];
    symbols: any[] = [];
    contractTypes: any[] = [];

    constructor(
        private messageService: MessageService,
        private readonly userService: UserService,
        private readonly districtService: DistrictService,
        private readonly provinceService: ProvinceService,
        private readonly wardService: WardService,
        private readonly translateService: TranslateService,
        private readonly userRoleService: UserRoleService,
        private readonly branchService: BranchService,
        private readonly majorService: MajorService,
        private readonly warehouseService: StoreService,
        private readonly positionDetailService: PositionDetailService,
        private readonly targetService: TargetService,
        private readonly symbolService: SymbolService,
        private readonly contractTypeService: ContractTypeService,
        private readonly confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getListDistrict();
        this.getListProvince();
        this.getListWard();
        this.getListRole();
        this.getListBranch();
        this.getListMajor();
        this.getListWarehouse();
        this.getListPositionDetail();
        this.getListTarget();
        this.getListSymbol();
        this.getListContractType();
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
            this.getUsers();
        }
    }

    onChangeSort(event, type) {
        if (type === 'sortType') {
            this.getParams.isSort = event.value;
        }
        this.getUsers();
    }

    clearFilter(columnFilter: ColumnFilter, field: string) {
        columnFilter.clearFilter();
    }

    private openDownloadFile(_fileName: string, _ft: string) {
        try {
            this.isLoading = false;
            var _l = this.userService.getFolderPathDownload(_fileName, _ft);
            if (_l) window.open(_l);
        } catch (ex) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: 'File invalid',
            });
        }
    }

    getUsers(event?: any, isExport: boolean = false): void {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.loading = true;
        if (event) {
            //     this.first = event.first / event.rows;
            //     this.getParams.ascSort = event.sortOrder === 1;
            //     this.getParams.pageNumber = event.first / event.rows + 1;
            //     this.getParams.pageSize = event.rows;
            this.getParams.page = event.first / event.rows + 1;
            this.getParams.pageSize = event.rows;
        }
        if (isExport) {
            this.userService
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

        this.pendingRequest = this.userService
            .getPagingUser(this.getParams)
            .subscribe((response: TypeData<User>) => {
                AppUtil.scrollToTop();
                this.lstUsers = response.data;
                this.totalRecords = response.totalItems || 0;
                this.totalPages = response.totalItems / response.pageSize + 1;
                this.loading = false;
            });
    }

    getDetail(userId) {
        this.userService.getUserDetail(userId).subscribe((response: User) => {
            this.formData = response;
            this.isEdit = true;
            this.showDialog();
        });
    }

    onDelete(userId) {
        let message;
        this.translateService
            .get('question.delete_user_content')
            .subscribe((res) => {
                message = res;
            });
        this.confirmationService.confirm({
            message: message,
            accept: () => {
                this.userService
                    .deleteUser(userId)
                    .subscribe((response: User) => {
                        this.getUsers();
                    });
            },
        });
    }

    baseUrlImage(image) {
        return `${environment.serverURL}/${image}`;
    }

    showDialog() {
        this.userFormComponent.onReset();
        this.display = true;
    }

    getListDistrict() {
        this.districtService
            .getListDistrict()
            .subscribe((response: District[]) => {
                this.districts = response;
            });
    }

    getListProvince() {
        this.provinceService
            .getListProvince()
            .subscribe((response: Province[]) => {
                this.provinces = response;
                this.nativeProvinces = this.provinces;
            });
    }

    getListWard() {
        this.wardService.getListWard().subscribe((response: Ward[]) => {
            this.wards = response;
        });
    }

    getListRole() {
        this.userRoleService.getAllUserRole().subscribe((response: any) => {
            console.log(this.roles);
            this.roles = response.data;
        });
    }

    getListBranch() {
        this.branchService.getAllBranch().subscribe((response: any) => {
            this.branches = response.data;
        });
    }

    getListMajor() {
        this.majorService.getAllMajor().subscribe((response: any) => {
            this.majors = response.data;
        });
    }

    getListWarehouse() {
        this.warehouseService.getAllStore().subscribe((response: any) => {
            this.warehouses = response.data;
        });
    }

    getListPositionDetail() {
        this.positionDetailService
            .getAllPositionDetail()
            .subscribe((response: any) => {
                this.positionDetails = response.data;
            });
    }

    getListTarget() {
        this.targetService.getAllTarget().subscribe((response: any) => {
            this.targets = response.data;
        });
    }

    getListSymbol() {
        this.symbolService.getAllSymbol().subscribe((response: any) => {
            this.symbols = response.data;
        });
    }

    getListContractType() {
        this.contractTypeService.getAllContractType().subscribe((response: any) => {
            this.contractTypes = response.data;
        });
    }

    getRoleName(id) {
        let role = this.roles.find((x) => x.id === id);
        return role ? role.title : '';
    }
}
