import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { NameValue, NameValueOfInt } from 'src/app/models/common.model';
import { IsTemplateDirective } from '../directives/is-template.directive';
import { IsTableClass } from './is-table.class';
import { ExcelActionTypeList, IsTableColumnType } from './is-table.model';

@Component({
  selector: 'is-table',
  templateUrl: './is-table.component.html',
  styleUrls: ['./is-table.component.scss']
})
export class IsTableComponent implements OnInit, AfterContentInit{

  @Input() styleClass = '';
  @Input() headerDropdownOptions: any[] = [];
  @Input() showHeaderDropdown = false;
  @Input() showHeaderButton = false;
  @Output() expandChange = new EventEmitter<any>();
  @Output() excelActionChange = new EventEmitter<NameValueOfInt>();
  @Output() changeHeaderDropdown = new EventEmitter<any>();
  @Output() headerButtonClick = new EventEmitter();

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  isTable: IsTableClass = new IsTableClass();
  columnType = IsTableColumnType;
  expandTemplate: TemplateRef<any>;
  excelAction: NameValueOfInt;
  excelActions = ExcelActionTypeList;

  constructor(
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.templates.forEach(template => {
      switch(template.getType()) {
        case this.columnType.Expand.toString():
          this.expandTemplate = template.template;
      }
    })
  }

  update(data: any[]) {
    this.isTable.update(data);
    this._cdr.detectChanges();
  }

  onExpand(rowData: any) {
    this.expandChange.emit(rowData);
  }

  onRowCollapse(eventData: any) {
    console.log(eventData);
  }

  onChangeExcelAction(data: NameValueOfInt) {
    this.excelActionChange.emit(data);
  }

  onChangeHeaderDropdown(data: any) {
    this.changeHeaderDropdown.emit(data);
  }

  onHeaderButtonClick(){
    this.headerButtonClick.emit();
  }
}
