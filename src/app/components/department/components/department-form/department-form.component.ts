import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { DepartmentService } from 'src/app/service/department.service';
import AppConstant from 'src/app/utilities/app-constants';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';


@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styles: [
        `
            :host ::ng-deep {
                #phonePrefix .p-dropdown {
                    width: 93px;
                }
            }
        `,
    ],
})
export class DepartmentFormComponent implements OnInit, OnChanges {
    public appConstant = AppConstant;
    @Input('formData') formData: any = {};
    @Input('isReset') isReset: boolean = false;
    @Input('isEdit') isEdit: boolean = false;
    @Input('display') display: boolean = false;
    @Output() onCancel = new EventEmitter();
    title: string = '';

    departmentForm: FormGroup = new FormGroup({});

    optionCountries = AppData.COUNTRIES;
    countryCodes: any[] = [];

    isSubmitted = false;
    isInvalidForm = false;
    failPassword: boolean = false;

    constructor(
        private fb: FormBuilder,
        private translateService: TranslateService,
        private messageService: MessageService,
        private departmentService: DepartmentService
    ) {
        this.departmentForm = this.fb.group(
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
            this.title = AppUtil.translate(this.translateService, 'label.edit_department');
            this.departmentForm.setValue({
                id: this.formData.id,
                code: this.formData.code,
                name: this.formData.name,
            });
        } else {
            this.title = AppUtil.translate(this.translateService, 'label.add_department');
        }
    }

    onReset() {
        this.isInvalidForm = false;
        this.departmentForm.reset();
    }

    ngOnInit() {
        this.countryCodes = AppUtil.getCountries();
    }

    checkValidValidator(fieldName: string) {
        return ((this.departmentForm.controls[fieldName].dirty ||
            this.departmentForm.controls[fieldName].touched) &&
            this.departmentForm.controls[fieldName].invalid) ||
            (this.isInvalidForm &&
                this.departmentForm.controls[fieldName].invalid)
            ? 'ng-invalid ng-dirty'
            : '';
    }

    checkValidMultiValidator(fieldNames: string[]) {
        for (let i = 0; i < fieldNames.length; i++) {
            if (
                ((this.departmentForm.controls[fieldNames[i]].dirty ||
                    this.departmentForm.controls[fieldNames[i]].touched) &&
                    this.departmentForm.controls[fieldNames[i]].invalid) ||
                (this.isInvalidForm &&
                    this.departmentForm.controls[fieldNames[i]].invalid)
            ) {
                return true;
            }
        }
        return false;
    }

    onSubmit() {
        this.isSubmitted = true;
        this.isInvalidForm = false;
        if (this.departmentForm.invalid) {
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
            AppUtil.cleanObject(this.departmentForm.value)
        );
        console.log(newData);
        this.onCancel.emit({});
        if (this.isEdit) {
            this.departmentService
                .updateDepartment(newData, this.formData.id)
                .subscribe((res) => {
                    this.onCancel.emit({});
                });
        } else {
            this.departmentService.createDepartment(newData).subscribe((res) => {
                this.onCancel.emit({});
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

    getDayOfWeek(date: any) {
        return new Date(date.year, date.month, date.day).getDay();
    }
}
