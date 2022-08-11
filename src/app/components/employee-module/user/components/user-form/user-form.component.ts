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
import { WardService } from 'src/app/service/ward.service';
import { Branch } from 'src/app/models/branch.model';
import * as moment from 'moment';
import { Major } from 'src/app/models/major.model';
import { Store } from 'src/app/models/store.model';
import { PositionDetail } from 'src/app/models/position-detail.model';
import { Target } from 'src/app/models/target.model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styles: [
        `
            :host ::ng-deep {
                .p-dropdown.p-dropdown-clearable .p-dropdown-label {
                    min-height: 37px;
                }

                .p-dropdown {
                    min-height: 39px;
                }
            }
        `,
    ],
})
export class UserFormComponent implements OnInit, OnChanges {
    public appConstant = AppConstant;
    public appUtil = AppUtil;
    @Input('formData') formData: any = {};
    @Input('provinces') provinces: Province[] = [];
    @Input('branches') branches: Branch[] = [];
    @Input('majors') majors: Major[] = [];
    @Input('warehouses') warehouses: Store[] = [];
    @Input('positionDetails') positionDetails: PositionDetail[] = [];
    @Input('targets') targets: Target[] = [];
    @Input('symbols') symbols: Symbol[] = [];
    @Input('roles')
    roles: any[] = [];
    @Input('isReset') isReset: boolean = false;
    @Input('isEdit') isEdit: boolean = false;
    @Input('display') display: boolean = false;
    @Output() onCancel = new EventEmitter();

    optionCountries = AppData.COUNTRIES;
    title: string = '';

    districts: District[] = [];
    wards: Ward[] = [];
    userForm: FormGroup = new FormGroup({});

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
                phone: ['', [Validators.required]],
                birthday: ['', [Validators.required]],
                code: ['', [Validators.required]],
                provinceId: ['', [Validators.required]],
                districtId: ['', [Validators.required]],
                wardId: ['', [Validators.required]],
                branchId: ['', [Validators.required]],
                userRoleIds: ['', [Validators.required]],
                warehouseId: ['', [Validators.required]],
                avatar: [''],
                departmentId: ['', Validators.required],
                positionDetailId: ['', Validators.required],
                targetId: ['', Validators.required],
                symbolId: ['', Validators.required],
                language: ['', Validators.required],
                gender: ['', Validators.required],
                note: ['', Validators.required],
                literacy: ['', Validators.required],
                literacyDetail: ['', Validators.required],
                majorId: ['', Validators.required],
                certificateOther: ['', Validators.required],
                personalTaxCode: ['', Validators.required],
                socialInsuranceCreated: ['', Validators.required],
                socialInsuranceCode: ['', Validators.required],
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
                phone: this.formData.phone,
                birthday: moment(this.formData.birthday).format(
                    this.appConstant.FORMAT_DATE.VN_DATE_PIPE_SHORT_DATE
                ),
                code: this.formData.code,
                provinceId: this.formData.provinceId,
                districtId: this.formData.districtId,
                wardId: this.formData.wardId,
                branchId: this.formData.branchId,
                warehouseId: this.formData.warehouseId,
                positionDetailId: this.formData.positionDetailId,
                targetId: this.formData.targetId,
                symbolId: this.formData.symbolId,
                language: this.formData.language,
                gender: this.formData.gender,
                note: this.formData.note,
                userRoleIds: Array.from(this.formData.userRoleIds)
                    .map((x: string) => {
                        return parseInt(x);
                    })
                    .filter((x) => x),
                departmentId: this.formData.departmentId,
                literacy: this.formData.literacy,
                literacyDetail: this.formData.literacyDetail,
                majorId: this.formData.majorId,
                certificateOther: this.formData.certificateOther,
                avatar: this.formData.avatar,

                // tax code
                personalTaxCode: this.formData.personalTaxCode,
                socialInsuranceCreated: moment(
                    this.formData.socialInsuranceCreated
                ).format(this.appConstant.FORMAT_DATE.VN_DATE_PIPE_SHORT_DATE),
                socialInsuranceCode: this.formData.socialInsuranceCode,
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
        newData.districtId = parseInt(newData.districtId) || 0;
        newData.provinceId = parseInt(newData.provinceId) || 0;
        newData.wardId = parseInt(newData.wardId) || 0;
        newData.branchId = parseInt(newData.branchId) || 0;
        newData.avatar = newData.avatar || '';
        newData.userRoleIds = newData.userRoleIds.filter((x) => x).join(',');
        newData.gender = parseInt(newData.gender) || 0;
        // delete params form
        delete newData.confirmPassword;

        newData.birthday = this.appUtil.formatLocalTimezone(
            moment(
                newData.birthday,
                this.appConstant.FORMAT_DATE.VN_DATE_PIPE_SHORT_DATE
            ).format(this.appConstant.FORMAT_DATE.T_DATE)
        );
        newData.socialInsuranceCreated = this.appUtil.formatLocalTimezone(
            moment(
                newData.socialInsuranceCreated,
                this.appConstant.FORMAT_DATE.VN_DATE_PIPE_SHORT_DATE
            ).format(this.appConstant.FORMAT_DATE.T_DATE)
        );
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

    doRegist(value) {
        console.log('do regist' + value);
    }
}
