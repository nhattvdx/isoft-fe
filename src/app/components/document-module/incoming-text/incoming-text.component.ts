import {Component, OnInit} from '@angular/core';
import {Page, TypeData} from "../../../models/common.model";
import {IncomingTextModel} from "../../../models/incoming-text.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../../service/user.service";
import {IncomingTextService} from "../../../service/incoming-text.service";
import AppUtil from "../../../utilities/app-util";
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../../models/user.model";
import {Router} from '@angular/router';

@Component({
    selector: 'app-incoming-text',
    providers: [MessageService, ConfirmationService],
    templateUrl: './incoming-text.component.html',
    styleUrls: ['../../../../assets/demo/badges.scss'],
    styles: []
})
export class IncomingTextComponent implements OnInit {
    loading: boolean = false;
    sortFields: any[] = [];
    sortTypes: any[] = [];
    result: TypeData<IncomingTextModel> = {
        data: [],
        currentPage: 0,
        nextStt: 0,
        pageSize: 10,
        totalItems: 0
    }
    param: Page = {
        page: 0,
        pageSize: 10,
    }

    constructor(
        private readonly messageService: MessageService,
        private readonly incomingTextService: IncomingTextService,
        private readonly translateService: TranslateService,
        private readonly confirmationService: ConfirmationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getIncomingText()
    }

    getIncomingText(event?: any) {
        if (event) {
            this.param.page = event.first / event.rows;
            this.param.pageSize = event.rows;
        }
        this.incomingTextService.getPagingIncomingText(this.param).subscribe(res => {
            AppUtil.scrollToTop()
            this.result = res
        }, error => {
            this.messageService.add({severity: 'error', detail: 'Lỗi lấy dữ liệu'})
        })
    }

    onAddIncomingText() {
        this.router.navigate([`/uikit/incoming-text/create`]).then()
    }

    getIncomingTextDetail(id) {
        this.router.navigate([`/uikit/incoming-text/${id}`]).then()
    }

    onDeleteIncomingText(id) {
        let message;
        this.translateService
            .get('question.delete_incoming_text_content')
            .subscribe((res) => {
                message = res;
            });
        this.confirmationService.confirm({
            message: message,
            accept: () => {
                this.incomingTextService.deleteIncomingText(id).subscribe(res => {
                    AppUtil.scrollToTop()
                    this.messageService.add({severity: 'success', detail: 'Xóa thành công'})
                }, error => {
                    this.messageService.add({severity: 'error', detail: 'Lỗi lấy dữ liệu'})
                })
            },
        });

    }

    onChangeSort(event, type) {
    }
}
