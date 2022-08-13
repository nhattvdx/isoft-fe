import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationService, MessageService} from "primeng/api";
import {IncomingTextService} from 'src/app/service/incoming-text.service';
import AppUtil from 'src/app/utilities/app-util';
import {IncomingTextModel} from "../../../../models/incoming-text.model";

@Component({
    selector: 'app-incoming-text-form',
    providers: [MessageService, ConfirmationService],
    templateUrl: './incoming-text-form.component.html',
    styles: []
})
export class IncomingTextFormComponent implements OnInit {
    incomingTextId = ''
    isEdit = false
    incomingTextModel: IncomingTextModel = {
        toDate: new Date(),
        textDate: new Date()
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private readonly messageService: MessageService,
        private readonly incomingTextService: IncomingTextService,
        private readonly translateService: TranslateService,
        private readonly confirmationService: ConfirmationService
    ) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id')
        switch (param) {
            case 'create':
                this.isEdit = false
                break
            default:
                this.isEdit = true
                this.incomingTextId = param
                this.getIncomingTextDetail(this.incomingTextId)
        }
    }

    getIncomingTextDetail(id) {
        this.incomingTextService.getIncomingTextDetail(id).subscribe(res => {
            this.incomingTextModel = res
        }, error => {
            this.messageService.add({severity: 'error', detail: 'Lỗi lấy dữ liệu'})
        })
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

    onUploadFile(event) {

    }

    onSave() {

    }

    onBack() {
        this.router.navigate(['/uikit/incoming-text']).then()
    }
}
