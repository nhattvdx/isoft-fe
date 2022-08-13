import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {TextGoModel} from "../../../../models/text-go.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TextGoService} from "../../../../service/text-go.service";

@Component({
    selector: 'app-text-go-form',
    providers: [MessageService, ConfirmationService],
    templateUrl: './text-go-form.component.html',
    styleUrls: []
})
export class TextGoFormComponent implements OnInit {
    textGoId = ''
    isEdit = false
    textGoModel: TextGoModel = {
        toDate: new Date(),
        textDate: new Date()
    }
    textGoTypes = [
        {
            name: 'Loại 1',
            code: 'abc'
        }
    ]

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private readonly messageService: MessageService,
        private readonly textGoService: TextGoService,
    ) {
    }

    ngOnInit(): void {
    }

    onUploadFile(event) {

    }

    onSave() {

    }

    onBack() {
        this.router.navigate(['/uikit/text-go']).then()
    }
}
