import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TransferModel } from 'src/app/models/arise-search.model';
import { Arise } from 'src/app/models/arise.model';
import { LedgerRequestModel, Page } from 'src/app/models/common.model';
import { DocumentModel } from 'src/app/models/document.model';
import { Ledger } from 'src/app/models/ledger.model';
import { AriseService } from 'src/app/service/arise.service';
import { BroadcasterService } from 'src/app/service/broadcaster.service';
import { CaseService } from 'src/app/service/case.service';
import { ChartOfAccountService } from 'src/app/service/chart-of-account.service';
import { CompanyService } from 'src/app/service/company.service';
import { DescriptionService } from 'src/app/service/description.service';
import { DocumentService } from 'src/app/service/document.service';
import { LedgerService } from 'src/app/service/ledger.service';
import { LookupValueService } from 'src/app/service/lookup-value.service';
import { ManagementAriseExcelService } from 'src/app/service/management-arise-excel.service';
import { PayerService } from 'src/app/service/payer.service';
import { TaxrateService } from 'src/app/service/taxrate.service';
import { UnitConventionService } from 'src/app/service/unit-convention.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { UnitConvertionPipe } from 'src/app/shared/pipes';
import { Helper } from 'src/app/utilities/helper.help';
// get the height
@Component({
    selector: 'app-arise',
    templateUrl: './arise.component.html',
    styleUrls: ['./arise.component.scss'],
    providers: [UnitConvertionPipe],
})
export class AriseComponent implements OnInit {
    //#region Các khai báo mang tính toàn cục
    @Input() public ariseForm: Arise;
    public arise: Arise;
    public arises: Arise[] = [];
    public totalRecords = 0;
    public newLedger: Ledger = new Ledger();
    private ledgerNextStt: number = 0;
    public ledgersCollection: Ledger[] = [];
    public ledgerRequestModel: LedgerRequestModel = {
        page: 0,
        pageSize: 20,
        filterMonth: new Date().getMonth() + 1,
        documentType: 'PT', // phieu thu tien mat
        isInternal: 1,
    };
    paramToGetLedgers = {
        keyword: null,
        documentType: null,
        documentTypeCode: '',
        documentMonth: new Date().getMonth() + 1,
        payer: null,
        address: null,
        documentDay: this.convertDateInString(),
        transferModelTypeData: 1,
        page: 0,
        pagesize: 20,
    };
    private isMustInputDebitSecondDetails = false;
    private isMustInputCreditSecondDetails = false;
    //#region Khai báo các cờ kiểm tra
    public TAB_INDEX_COUNT = 1;
    public IGNORE_ACCOUNT_VALIDATE = true;
    public FOCUS_DELAY_IN_MS = 200;
    public documentList: DocumentModel[] = [];
    public titleDoc: string = null;
    transferModel: TransferModel = new TransferModel();
    public paging: Page = { page: 1, pageSize: 100, searchText: '' };
    public createType = 0;
    isMobile = screen.width <= 1199;
    constructor(
        private readonly ariseService: AriseService,
        private readonly caseService: CaseService,
        private readonly documentService: DocumentService,
        private readonly broadcasterService: BroadcasterService,
        //private readonly notificationService: NotificationService,
        private readonly wareHouseService: WarehouseService,
        private readonly payerService: PayerService,
        private readonly taxRateService: TaxrateService,
        private readonly descriptionService: DescriptionService,
        private readonly ledgerService: LedgerService,
        private readonly unitConventionService: UnitConventionService,
        private readonly lookupValueService: LookupValueService,
        private readonly chartOfAccountService: ChartOfAccountService,
        //private readonly moneyPipe: MoneyPipe,
        private cdRef: ChangeDetectorRef,
        private readonly managementAriseExcelService: ManagementAriseExcelService,
        private readonly companyService: CompanyService
    ) {}

    ngOnInit() {
        let winWidth = screen.width;
        this.searchLedgers();
    }
    public searchLedgers() {
        this.transferModel.typeData = this.newLedger.isInternal;
        this.ledgerRequestModel.filterMonth =
            this.paramToGetLedgers.documentMonth;
        this.ledgerRequestModel.isInternal = this.newLedger.isInternal;
        this.ledgerRequestModel.documentType =
            this.paramToGetLedgers.documentTypeCode;
        // this.paramToGetLedgers.documentType.code;
        this.ledgerRequestModel.searchText = this.paramToGetLedgers.keyword;
        this.getLedgerCollection();
    }
    private getLedgerCollection() {
        this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, true);
        this.ledgerService
                .getLedgerCollection(this.ledgerRequestModel)
                .subscribe((resp) => {
                    this.ledgersCollection = [...resp.data];
                    this.totalRecords = resp.data.length;
                    //this.initDescriptionLoop();

                    if (this.createType == 0) {
                        this.ledgerNextStt = resp.nextStt;
                        this.newLedger.order = resp.nextStt;
                        // this.updateDocumentType();
                    } else if (this.createType == 1) {
                        //this.focusTaiKhoanNo();
                    } else if (this.createType == 2) {
                        //this.focusLoaiHoaDon();
                    } else if (this.createType == 3) {
                        //this.focusThanhTien();
                    }
                    console.log(`getLedgerCollection`, resp.data);
                });
    }
    filterChange(paramToGetLedgers) {
        this.paramToGetLedgers = { ...paramToGetLedgers };
        console.log(paramToGetLedgers);
    }
    convertDateInString(crrDate: string | Date = new Date()) {
        crrDate = new Date(crrDate);
        return `${crrDate.getDate().toString().padStart(2, '0')}/${(
            crrDate.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}/${crrDate
            .getFullYear()
            .toString()
            .padStart(2, '0')}`;
    }
}
