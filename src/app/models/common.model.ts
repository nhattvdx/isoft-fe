export interface Page {
    page: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    isSort?: boolean;
}

export interface TypeData<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    nextStt: number;
    totalItems: number;
}

export interface NameValue<T> {
    name: string;
    value: T;
}

export interface NameValueOfInt extends NameValue<number> {}

export interface Error {
    error: {
        msg: string;
    };
}
export interface EntityList {
    id: number;
    name: string;
}

export interface BusinessType extends EntityList {
    data: string;
}

export interface SearchPage extends Page {
    keyword?: string;
}

export interface SearchPageArise {
    DocumentType?: number;
    DocumentMonth?: number;
    DocumentDay?: string;
    keyword?: string;
    page: number;
    pageSize?: number;
}

export interface SelectListItem {
    name: string;

    value: string | number;
}

export interface LedgerRequestModel {
    page: number;
    pageSize?: number;
    searchText?: string;
    documentType?: string;
    filterMonth?: number;
    isInternal?: number;
}

export class CalculateTaxResponseModel {
    tax: number;
    creditCode: string;
    debitCode: string;
}

export class SearchResult<T> {
    constructor() {
      this.dt = [];
      this.dts = [];
      this.ti = 0;
      this.p = 0;
      this.pz = 0;
    }
    ti?: number;
    p?: number;
    pz?: number;
    dt?: T[];
    dts?: T[];
    nextStt?: any;
  }
  export class SearchCriteria {
    constructor() {
      this.page = 1;
      this.pagesize = 20;
      this.searchText = "";
    }
    page: number;
    pagesize?: number;
    searchText?: string;
    type?: number;
  }
  
  export class CommonKeyValueModel {
    key: string = "";
    value: string = "";
  }
  export const MAX_INTEGER_VALUE = 2147483647;
  