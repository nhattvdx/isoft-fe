import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import AppConstant from 'src/app/utilities/app-constants';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';
import { SymbolService } from 'src/app/service/symbol.service';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
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
export class ShiftFormComponent implements OnInit, OnChanges {
  public appConstant = AppConstant;
  @Input('formData') formData: any = {};
  @Input('isReset') isReset: boolean = false;
  @Input('isEdit') isEdit: boolean = false;
  @Input('display') display: boolean = false;
  @Output() onCancel = new EventEmitter();
  title: string = '';

  SymbolForm: FormGroup = new FormGroup({});

  optionCountries = AppData.COUNTRIES;
  countryCodes: any[] = [];

  isSubmitted = false;
  isInvalidForm = false;
  failPassword: boolean = false;

  constructor(
      private fb: FormBuilder,
      private translateService: TranslateService,
      private messageService: MessageService,
      private SymbolService: SymbolService
  ) {
      this.SymbolForm = this.fb.group(
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
          this.title = AppUtil.translate(this.translateService, 'label.edit_Symbol');
          this.SymbolForm.setValue({
              id: this.formData.id,
              code: this.formData.code,
              name: this.formData.name,
          });
      } else {
          this.title = AppUtil.translate(this.translateService, 'label.add_Symbol');
      }
  }

  onReset() {
      this.isInvalidForm = false;
      this.SymbolForm.reset();
  }

  ngOnInit() {
      this.countryCodes = AppUtil.getCountries();
  }

  checkValidValidator(fieldName: string) {
      return ((this.SymbolForm.controls[fieldName].dirty ||
          this.SymbolForm.controls[fieldName].touched) &&
          this.SymbolForm.controls[fieldName].invalid) ||
          (this.isInvalidForm &&
              this.SymbolForm.controls[fieldName].invalid)
          ? 'ng-invalid ng-dirty'
          : '';
  }

  checkValidMultiValidator(fieldNames: string[]) {
      for (let i = 0; i < fieldNames.length; i++) {
          if (
              ((this.SymbolForm.controls[fieldNames[i]].dirty ||
                  this.SymbolForm.controls[fieldNames[i]].touched) &&
                  this.SymbolForm.controls[fieldNames[i]].invalid) ||
              (this.isInvalidForm &&
                  this.SymbolForm.controls[fieldNames[i]].invalid)
          ) {
              return true;
          }
      }
      return false;
  }

  onSubmit() {
      this.isSubmitted = true;
      this.isInvalidForm = false;
      if (this.SymbolForm.invalid) {
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
          AppUtil.cleanObject(this.SymbolForm.value)
      );
      console.log(newData);
      this.onCancel.emit({});
      if (this.isEdit) {
          this.SymbolService
              .updateSymbol(newData, this.formData.id)
              .subscribe((res) => {
                  this.onCancel.emit({});
              });
      } else {
          this.SymbolService.createSymbol(newData).subscribe((res) => {
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
