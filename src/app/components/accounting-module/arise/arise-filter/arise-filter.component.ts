import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { CaseTypeEnum } from 'src/app/enums/case.type';
import { TransferModel } from 'src/app/models/arise-search.model';
import { Arise } from 'src/app/models/arise.model';
import { ChartOfAccount } from 'src/app/models/case.model';
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
    selector: 'app-arise-filter',
    templateUrl: './arise-filter.component.html',
    //styleUrls: ['./arise.component.scss'],
    providers: [UnitConvertionPipe],
})
export class AriseFilterComponent implements OnInit {
    @Input() filter = {
        keyword: null,
        documentType: null,
        documentTypeCode: '',
        documentMonth: new Date().getMonth() + 1,
        documentMonthStr: `${new Date().getMonth() + 1}`,
        payer: null,
        address: null,
        documentDay: this.convertDateInString(),
        transferModelTypeData: 1,
        page: 0,
        pageSize: 20,
    };
    @Output(    ) filterChange = new EventEmitter();
    documentList: DocumentModel[] = [];
    months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
    titleDoc: string = null;
    internalTypes = [
        { name: '1. HT', value: 1 },
        { name: '2. NB', value: 2 },
        { name: '3. Cả hai', value: 3 },
    ];
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
        this.getDocumentTypeList();
    }
    getDocumentTypeList() {
        try {
            this.documentService
                .getDocuments({ page: 0, pagesize: 100 })
                .subscribe((resp) => {
                    this.documentList = [...resp.data];
                    var docType = this.documentList.find((x) => x.code == 'PT');
                    this.filter.documentMonthStr =
                        'Tháng ' + this.filter.documentMonth;
                    this.filter.documentType = docType;
                    this.filter.documentTypeCode = docType.code;
                    this.titleDoc = docType.title || 'Họ tên';
                });

            // await this.getLedgerCollection();
        } catch (e) {
        } finally {
            // this.broadcasterService.broadcast(Helper.GLOBAL_LOADING, false);
        }
    }
    search() {
        this.filterChange.emit(this.filter);
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
