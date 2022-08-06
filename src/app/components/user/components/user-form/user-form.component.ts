import { WardService } from './../../../../service/ward.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import AppConstant from 'src/app/utilities/app-constants';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';
import { Province } from 'src/app/models/province.model';
import { District } from 'src/app/models/district.model';
import { Ward } from 'src/app/models/ward.model';
import { UserService } from 'src/app/service/user.service';
import { DepartmentService } from 'src/app/service/department.service';
import { DistrictService } from 'src/app/service/district.service';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
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
export class UserFormComponent implements OnInit, OnChanges {
    public appConstant = AppConstant;
    @Input('formData') formData: any = {};
    @Input('provinces') provinces: Province[] = [];

    @Input('roles') roles: any[] = [];
    @Input('isReset') isReset: boolean = false;
    @Input('isEdit') isEdit: boolean = false;
    @Input('display') display: boolean = false;
    @Output() onCancel = new EventEmitter();
    title: string = '';

    districts: District[] = [];
    wards: Ward[] = [];
    userForm: FormGroup = new FormGroup({});

    optionCountries = AppData.COUNTRIES;
    countryCodes: any[] = [];

    isSubmitted = false;
    isInvalidForm = false;

    departments: any[] = [];

    constructor(
        private fb: FormBuilder,
        private translateService: TranslateService,
        private messageService: MessageService,
        private departmentService: DepartmentService,
        private userService: UserService,
        private readonly districtService: DistrictService,
        private readonly wardService: WardService
    ) {
        this.userForm = this.fb.group(
            {
                id: [''],
                username: ['', [Validators.required]],
                password: [''],
                confirmPassword: [''],
                fullName: ['', [Validators.required]],
                code: ['', [Validators.required]],
                provinceId: ['0'],
                districtId: ['0'],
                wardId: ['0'],
                // userRoleId: [
                //     AppConstant.ROLE_TYPE.ADMIN,
                //     [Validators.required],
                // ],
                avatar: [''],
                departmentId: ['', Validators.required],
            },
            {
                validators: this.validateConfirmPassword.bind(this),
            }
        );
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (
            this.isEdit &&
            this.formData &&
            Object.keys(this.formData).length > 0
        ) {
            this.title = AppUtil.translate(
                this.translateService,
                'label.edit_user'
            );
            this.userForm.controls['password'].removeValidators([
                Validators.required,
                Validators.pattern(this.appConstant.PATTERNS.PASSWORD),
            ]);
            this.userForm.controls['confirmPassword'].removeValidators([
                Validators.required,
            ]);

            this.userForm.get('password').updateValueAndValidity();
            this.userForm.get('confirmPassword').updateValueAndValidity();
            this.userForm.setValue({
                id: this.formData.id,
                username: this.formData.username,
                password: '',
                confirmPassword: '',
                fullName: this.formData.fullName,
                code: this.formData.code,
                provinceId: this.formData.provinceId,
                districtId: this.formData.districtId,
                wardId: this.formData.wardId,
                // userRoleId: this.formData.userRoleId,
                departmentId: this.formData.departmentId,
                avatar: this.formData.avatar,
            });
            if (this.formData.provinceId > 0) {
                this.getDistrict({
                    value: this.formData.provinceId,
                });
            }
        } else {
            this.userForm.controls['password'].addValidators([
                Validators.required,
                Validators.pattern(this.appConstant.PATTERNS.PASSWORD),
            ]);
            this.userForm.controls['confirmPassword'].addValidators([
                Validators.required,
            ]);
            this.userForm.get('password').updateValueAndValidity();
            this.userForm.get('confirmPassword').updateValueAndValidity();
            this.title = AppUtil.translate(
                this.translateService,
                'label.add_user'
            );
        }
    }

    onReset() {
        this.isInvalidForm = false;
        this.userForm.reset();
    }

    ngOnInit() {
        this.countryCodes = AppUtil.getCountries();
        this.getDepartmentList();
    }

    validateConfirmPassword(formGroup: FormGroup) {
        // @ts-ignore
        const password = formGroup.get('password').value;
        // @ts-ignore
        const confirmPassword = formGroup.get('confirmPassword').value;
        return password === confirmPassword ? null : { passwordNotMatch: true };
    }

    checkValidValidator(fieldName: string) {
        return ((this.userForm.controls[fieldName].dirty ||
            this.userForm.controls[fieldName].touched) &&
            this.userForm.controls[fieldName].invalid) ||
            (this.isInvalidForm && this.userForm.controls[fieldName].invalid)
            ? 'ng-invalid ng-dirty'
            : '';
    }

    checkValidMultiValidator(fieldNames: string[]) {
        for (let i = 0; i < fieldNames.length; i++) {
            if (
                ((this.userForm.controls[fieldNames[i]].dirty ||
                    this.userForm.controls[fieldNames[i]].touched) &&
                    this.userForm.controls[fieldNames[i]].invalid) ||
                (this.isInvalidForm &&
                    this.userForm.controls[fieldNames[i]].invalid)
            ) {
                return true;
            }
        }
        return false;
    }

    getDepartmentList() {
        this.departmentService.getAllDepartment().subscribe((response: any) => {
            this.departments = response.data;
        });
    }

    onSubmit() {
        console.log(this.userForm);
        this.isSubmitted = true;
        this.isInvalidForm = false;
        if (this.userForm.invalid) {
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
            AppUtil.cleanObject(this.userForm.value)
        );
        console.log(newData);
        this.onCancel.emit({});
        if (this.isEdit) {
            this.userService
                .updateUser(newData, this.formData.id)
                .subscribe((res) => {
                    console.log('res', res);
                    this.onCancel.emit({});
                });
        } else {
            this.userService.createUser(newData).subscribe((res) => {
                console.log('res', res);
                this.onCancel.emit({});
            });
        }
    }

    cleanObject(data) {
        let newData = Object.assign({}, data);
        if (!(newData.id > 0)) {
            newData.id = 0;
        }
        // newData.userRoleId = parseInt(newData.userRoleId) || 0;
        newData.districtId = parseInt(newData.districtId) || 0;
        newData.provinceId = parseInt(newData.provinceId) || 0;
        newData.wardId = parseInt(newData.wardId) || 0;
        newData.unemployeeTime = parseInt(newData.unemployeeTime) || 0;
        newData.avatar = newData.avatar || '';
        // delete params form
        delete newData.confirmPassword;
        return newData;
    }

    getDayOfWeek(date: any) {
        return new Date(date.year, date.month, date.day).getDay();
    }

    getDistrict(id) {
        if (id.value > 0) {
            this.districtService
                .getDistrictForProvince(id.value)
                .subscribe((response: District[]) => {
                    this.districts = response;
                    console.log(response);
                    if (
                        this.districts !== undefined &&
                        this.districts.length > 0
                    ) {
                        this.getWard({
                            value: this.userForm.value.districtId,
                        });
                    }
                });
        } else {
            this.wards = [];
        }
    }
    getWard(id) {
        if (id.value > 0) {
            this.wardService
                .getWardForDistrict(id.value)
                .subscribe((response: Ward[]) => {
                    this.wards = response;
                });
        } else {
            this.wards = [];
        }
    }
}
