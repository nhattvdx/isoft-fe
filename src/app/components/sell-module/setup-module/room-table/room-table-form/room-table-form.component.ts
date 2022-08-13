import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'src/app/service/department.service';
import AppConstant from 'src/app/utilities/app-constants';
import AppUtil from 'src/app/utilities/app-util';


@Component({
    selector: 'app-room-table-form',
    templateUrl: './room-table-form.component.html',
    styles: [
        `
            :host ::ng-deep {
            }
        `,
    ],
})
export class RoomTableFormComponent implements OnInit, OnChanges {
    public appConstant = AppConstant;
    @Input('formData') formData: any = {};
    @Input('isEdit') isEdit: boolean = false;
    @Input('display') display: boolean = false;
    @Output() onCancel = new EventEmitter();
    title: string = '';

    roomTableForm: FormGroup = new FormGroup({});

    isSubmitted = false;
    isInvalidForm = false;
    existCode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private translateService: TranslateService,
        private messageService: MessageService,
        private departmentService: DepartmentService
    ) {
        this.roomTableForm = this.fb.group(
            {
                id: [''],
                code: ['', [Validators.required]],
                name: ['', [Validators.required]]
            }
        );
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (
            this.isEdit &&
            this.formData &&
            Object.keys(this.formData).length > 0
        ) {
            this.title = AppUtil.translate(this.translateService, 'label.edit_room_table');
            this.roomTableForm.setValue({
                id: this.formData.id,
                code: this.formData.code,
                name: this.formData.name,
            });
        } else {
            this.title = AppUtil.translate(this.translateService, 'label.add_room_table');
        }
    }

    onReset() {
        this.isInvalidForm = false;
        this.roomTableForm.reset();
    }

    ngOnInit() {
    }

    checkValidValidator(fieldName: string) {
        return ((this.roomTableForm.controls[fieldName].dirty ||
            this.roomTableForm.controls[fieldName].touched) &&
            this.roomTableForm.controls[fieldName].invalid) ||
            (this.isInvalidForm &&
                this.roomTableForm.controls[fieldName].invalid) ||
            (fieldName === 'code' && this.existCode)
            ? 'ng-invalid ng-dirty'
            : '';
    }

    checkValidMultiValidator(fieldNames: string[]) {
        for (let i = 0; i < fieldNames.length; i++) {
            if (
                ((this.roomTableForm.controls[fieldNames[i]].dirty ||
                    this.roomTableForm.controls[fieldNames[i]].touched) &&
                    this.roomTableForm.controls[fieldNames[i]].invalid) ||
                (this.isInvalidForm &&
                    this.roomTableForm.controls[fieldNames[i]].invalid)
            ) {
                return true;
            }
        }
        return false;
    }

    onSubmit() {
        this.isSubmitted = true;
        this.isInvalidForm = false;
        if (this.roomTableForm.invalid) {
            this.messageService.add({
                severity: 'error',
                detail: AppUtil.translate(
                    this.translateService,
                    'info.please_check_again'
                ),
            });
            this.isInvalidForm = true;
            this.isSubmitted = false;
            return;
        }

        let newData = this.cleanObject(
            AppUtil.cleanObject(this.roomTableForm.value)
        );
        console.log(newData);
        if (this.isEdit) {
            this.departmentService
                .updateDepartment(newData, this.formData.id)
                .subscribe((res: any) => {
                    if (res.status != 603) this.onCancel.emit({});
                    else this.existCode = true;
                });
        } else {
            this.departmentService.createDepartment(newData).subscribe((res: any) => {
                console.log(res);
                if (res.status != 603) this.onCancel.emit({});
                else this.existCode = true;
            });
        }
    }

    cleanObject(data) {
        let newData = Object.assign({}, data);
        if (!(newData.id > 0)) {
            newData.id = 0;
        }
        return newData;
    }

    onChangeCode() {
        console.log('on change code');
        if(this.existCode) {
            this.existCode = false;
            console.log('exist code ', this.existCode);
        }
    }
}
