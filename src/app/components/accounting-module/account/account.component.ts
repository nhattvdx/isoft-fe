import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccountGroupDetailForChildParams, AccountGroupDetailModel } from 'src/app/models/account-group.model';
import { NameValueOfInt, Page } from 'src/app/models/common.model';
import { AccountGroupService } from 'src/app/service/account-group.service';
import { IsTableComponent } from 'src/app/shared/is-table/is-table.component';
import { ExcelActionType, IIsTableColumn, IsTableColumn, IsTableColumnType } from 'src/app/shared/is-table/is-table.model';
import { AccountGroupDetailListModel, AccountType, AccountTypeList } from './account.model';
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {

    @ViewChild('accountTable', { static: false }) accountTableView: IsTableComponent;
    @ViewChild('accountTableChild', { static: false }) accountTableChildView: IsTableComponent;
    @ViewChild('accountTableSecondChild', { static: false }) accountTableSecondChildView: IsTableComponent;


    columnType = IsTableColumnType;
    queryParam: Page = {
        page: 1,
        pageSize: 500,
        sortField: 'id',
        isSort: true,
    };
    queryParamsForChild: AccountGroupDetailForChildParams = {
        page: 1,
        pageSize: 500,
        sortField: 'id',
        isSort: true,
        warehouseCode: ''
    };

    accountType = AccountType;
    accountTypeList = AccountTypeList;
    currentAccountType: AccountType = AccountType.HT;
    currentParentCode: string = '';
    tableData: AccountGroupDetailListModel[] = [];
    tableDataFirstChildNode: AccountGroupDetailListModel[] = [];
    tableDataForSecondChildNode: AccountGroupDetailListModel[] = [];

    constructor(
        private _accountGroupService: AccountGroupService
    ) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.initTable();
        this.retrieveAccountData();
    }

    //#region For Parent table Account Table
    initTable() {
        const columns = this.getColumnTableByAccount();
        this.accountTableView.isTable.isSearchable = true;
        this.accountTableView.isTable.columns = columns;
    }

    getColumnTableByAccount(): IsTableColumn[] {
        switch (this.currentAccountType) {
            case this.accountType.NB:
                return [
                    new IsTableColumn(<IIsTableColumn>{
                        header: '',
                        field: 'hasDetails',
                        type: IsTableColumnType.Expand,
                        innerFields: ['expaned']
                    }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.account_code',
                            field: 'code',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'left_menu.account',
                            field: 'name',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_debt_nb',
                            field: 'openingDebitNB',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_opening_nb',
                            field: 'openingCreditNB',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.currency',
                            field: 'isForeignCurrency',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.duration',
                            field: 'duration',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.nature',
                            field: 'accGroup',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
            default:
                return [
                    new IsTableColumn(<IIsTableColumn>{
                        header: '',
                        field: 'hasDetails',
                        type: IsTableColumnType.Expand,
                        innerFields: ['expaned']
                    }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.account_code',
                            field: 'code',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'left_menu.account',
                            field: 'name',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_debt',
                            field: 'openingDebit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_opening',
                            field: 'openingCredit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.currency',
                            field: 'isForeignCurrency',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.duration',
                            field: 'duration',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.nature',
                            field: 'accGroup',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
        }
    }

    retrieveAccountData() {
        this._accountGroupService.getListDetail(this.queryParam).subscribe(response => {
            console.log(response);

            const data = response.data.map(a => ({
                ...a,
                expanded: false,
            }))
            this.updateTable(data);
        })
    }

    updateTable(data: AccountGroupDetailListModel[]) {
        this.tableData = data;
        this.accountTableView.update(data);
    }

    onExpandChange(rowData: AccountGroupDetailListModel) {
        const isExpanded = !rowData.expanded;
        this.tableData.forEach(a => {
            a.expanded = a.id === rowData.id ? !a.expanded : false;
        });

        if (isExpanded) {
            this.currentParentCode = rowData.parentRef;
            // settimeout to get view child
            setTimeout(() => {
                this.initFirstChildTable();
                this.retrieveFirstTableChildData();
            });
        }
    }


    //#endregion

    //#region For First Child Node Table
    initFirstChildTable() {
        const columns = this.getColumnFirstChildTableByAccount();
        this.accountTableChildView.isTable.columns = columns;
    }

    getColumnFirstChildTableByAccount(): IsTableColumn[] {
        switch (this.currentAccountType) {
            case this.accountType.NB:
                return [
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: '',
                            field: 'hasChild',
                            type: IsTableColumnType.Expand,
                            innerFields: ['expaned']
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.warehouse_code',
                            field: 'warehouseCode',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.account_code',
                            field: 'code',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'left_menu.account',
                            field: 'name',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.SL',
                            field: 'openingStockQuantityNB',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.stock_unit',
                            field: 'stockUnit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_debt_nb',
                            field: 'openingDebitNB',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_opening_nb',
                            field: 'openingCreditNB',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
            default:
                return [
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: '',
                            field: 'hasChild',
                            type: IsTableColumnType.Expand,
                            innerFields: ['expaned']
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.warehouse_code',
                            field: 'warehouseCode',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.account_code',
                            field: 'code',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'left_menu.account',
                            field: 'name',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.SL',
                            field: 'openingStockQuantity',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.stock_unit',
                            field: 'stockUnit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_debt',
                            field: 'openingDebit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_opening',
                            field: 'openingCredit',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
        }
    }

    retrieveFirstTableChildData() {
        this._accountGroupService
            .getListDetailForChildNode(this.currentParentCode, this.queryParamsForChild)
            .subscribe(response => {
                console.log(response);

                const data = response.data.map(a => ({
                    ...a,
                    expanded: false
                }))
                this.updateFirstTableChild(data);
            })
    }

    updateFirstTableChild(data: any[]) {
        this.tableDataFirstChildNode = data;
        this.accountTableChildView.update(data);
    }

    onExpandChildNodeChange(rowData: AccountGroupDetailListModel) {
        const isExpanded = !rowData.expanded;
        this.tableDataFirstChildNode.forEach(a => {
            a.expanded = a.id === rowData.id ? !a.expanded : false;
        });

        if (isExpanded) {
            this.queryParamsForChild.warehouseCode = rowData.warehouseCode;

            // settimeout to get view child
            setTimeout(() => {
                this.initSecondChildTable();
                this.retrieveSecondChildTableData();
            });
        }
    }
    //#endregion

    //#region For Second Child node table
    initSecondChildTable() {
        const columns = this.getColumnSecondChildTableByAccount();
        this.accountTableSecondChildView.isTable.columns = columns;
    }

    getColumnSecondChildTableByAccount(): IsTableColumn[] {
        switch (this.currentAccountType) {
            case this.accountType.NB:
                return [
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_debt_nb',
                            field: 'openingDebitNB',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            header: 'label.residual_opening_nb',
                            field: 'openingCreditNB',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
            default:
                return [
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                            styleClass: 'w-8rem'
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: '',
                            styleClass: 'w-9rem'
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: 'openingDebit',
                        }),
                    new IsTableColumn(
                        <IIsTableColumn>{
                            field: 'openingCredit',
                        }),
                    new IsTableColumn(<IIsTableColumn>{
                        field: '',
                        innerFields: ['displayInsert', 'displayDelete'],
                        styleClass: 'w-20rem',
                        type: IsTableColumnType.AccountAction
                    })
                ];
        }
    }

    retrieveSecondChildTableData() {
        this._accountGroupService
            .getListDetailForChildNode(this.currentParentCode, this.queryParamsForChild)
            .subscribe(response => {
                console.log(response);

                const data = response.data.map(a => ({
                    ...a,
                    expanded: false
                }));

                this.updateSecondChildTable(data);
            })
    }

    updateSecondChildTable(data: any[]) {
        this.tableDataForSecondChildNode = data;
        this.accountTableSecondChildView.update(data);
    }

    //#endregion

    onExcelActionChange(action: NameValueOfInt) {
        if (action.value === ExcelActionType.Export) {

        } else {

        }
    }
}
