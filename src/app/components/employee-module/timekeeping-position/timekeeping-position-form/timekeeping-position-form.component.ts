import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import AppConstant from 'src/app/utilities/app-constants';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';
import { TargetService } from 'src/app/service/target.service';

@Component({
  selector: 'app-timekeeping-position-form',
  templateUrl: './timekeeping-position-form.component.html',
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
export class TimekeepingPositionFormComponent implements OnInit, OnChanges {
  public appConstant = AppConstant;
  @Input('formData') formData: any = {};
  @Input('isReset') isReset: boolean = false;
  @Input('isEdit') isEdit: boolean = false;
  @Input('display') display: boolean = false;
  @Output() onCancel = new EventEmitter();
  title: string = '';

  TargetForm: FormGroup = new FormGroup({});

  optionCountries = AppData.COUNTRIES;
  countryCodes: any[] = [];

  isSubmitted = false;
  isInvalidForm = false;
  failPassword: boolean = false;

  constructor(
      private fb: FormBuilder,
      private translateService: TranslateService,
      private messageService: MessageService,
      private TargetService: TargetService
  ) {
      this.TargetForm = this.fb.group(
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
          this.title = AppUtil.translate(this.translateService, 'label.edit_Target');
          this.TargetForm.setValue({
              id: this.formData.id,
              code: this.formData.code,
              name: this.formData.name,
          });
      } else {
          this.title = AppUtil.translate(this.translateService, 'label.add_Target');
      }
  }

  onReset() {
      this.isInvalidForm = false;
      this.TargetForm.reset();
  }

  ngOnInit() {
      this.countryCodes = AppUtil.getCountries();
  }

  checkValidValidator(fieldName: string) {
      return ((this.TargetForm.controls[fieldName].dirty ||
          this.TargetForm.controls[fieldName].touched) &&
          this.TargetForm.controls[fieldName].invalid) ||
          (this.isInvalidForm &&
              this.TargetForm.controls[fieldName].invalid)
          ? 'ng-invalid ng-dirty'
          : '';
  }

  checkValidMultiValidator(fieldNames: string[]) {
      for (let i = 0; i < fieldNames.length; i++) {
          if (
              ((this.TargetForm.controls[fieldNames[i]].dirty ||
                  this.TargetForm.controls[fieldNames[i]].touched) &&
                  this.TargetForm.controls[fieldNames[i]].invalid) ||
              (this.isInvalidForm &&
                  this.TargetForm.controls[fieldNames[i]].invalid)
          ) {
              return true;
          }
      }
      return false;
  }

  onSubmit() {
      this.isSubmitted = true;
      this.isInvalidForm = false;
      if (this.TargetForm.invalid) {
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
          AppUtil.cleanObject(this.TargetForm.value)
      );
      console.log(newData);
      this.onCancel.emit({});
      if (this.isEdit) {
          this.TargetService
              .updateTarget(newData, this.formData.id)
              .subscribe((res) => {
                  this.onCancel.emit({});
              });
      } else {
          this.TargetService.createTarget(newData).subscribe((res) => {
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

