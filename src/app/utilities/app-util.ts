import {TranslateService} from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';
import {Observable} from "rxjs";
import * as CountryList from "countries-list";
import {map} from "rxjs/operators";
import 'moment-timezone';
import * as moment from 'moment';

const AppUtil = {
    setStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    },
    getStorage(key: string): string {
        return localStorage.getItem(key);
    },
    removeStorage(key: string): void {
        localStorage.removeItem(key);
    },
    clearStorageAll(): void {
        localStorage.clear();
    },
    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toCamelCaseKey({ obj }: { obj: any }): any {
        if (Array.isArray(obj)) {
            return obj.map((v) => AppUtil.toCamelCaseKey({ obj: v }));
        } else if (obj && obj.constructor === Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.camelCase(key)]: AppUtil.toCamelCaseKey({
                        obj: obj[key],
                    }),
                }),
                {}
            );
        }
        return obj;
    },
    toSnakeCaseKey(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map((v) => AppUtil.toSnakeCaseKey(v));
        } else if (obj && obj.constructor === Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key]),
                }),
                {}
            );
        }
        return obj;
    },
    translateWithParams(
        service: TranslateService,
        key: any,
        params: any
    ): string {
        if (key && key === '') {
            return 'N/A';
        }
        let translateTxt = '';
        service.get(key, params).subscribe((res: string) => {
            translateTxt = res;
        });
        return translateTxt;
    },
    translate(service: TranslateService, key: string): string {
        if (!service || !key) {
            return '';
        }
        let translated = '';
        service.get(key).subscribe((s: string) => {
            translated = s;
        });
        return translated;
    },
    translateList: function (
        service: TranslateService,
        keys: string[],
        object: Object | undefined
    ): Observable<any> {
        return service.get(keys, object);
    },
    getBrowserLang() {
        return navigator.language || window.navigator.language;
    },
    hashMD5(text: string | CryptoJS.lib.WordArray): string {
        return CryptoJS.MD5(text).toString();
    },
    formatCurrencyVND(value) {
        return value.toLocaleString('vn-VN', {
            style: 'currency',
            currency: 'VND',
        });
    },
    formatCurrencyUSD(value) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    },
    getCountries() {
        let countryCodes = [];
        for (const key of Object.keys(CountryList.countries)) {
            const country = this.getCountry(key);
            if (country.phone.length < 3) {
                let countryCode = {
                    code: key,
                    prefix: '+' + country.phone,
                    countryCode: country.phone,
                };
                countryCodes.push(countryCode);
            }
        }
        return countryCodes;
    },
    getCountry(code: string): any {
        if (!code) {
            return;
        }
        // @ts-ignore
        return CountryList.countries[code.toUpperCase()];
    },
    convertDateTimeKr(date: string, downline: boolean) {
        if (!date) return '';
        let momentDate = moment(date);
        let dateKr = ['???', '???', '???', '???', '???', '???', '???'];
        let typeTime = momentDate.format('A') === 'AM' ? '??????' : '??????';
        if (!downline) {
            return `${momentDate.format('YY.MM.DD')} (${
                dateKr[parseInt(momentDate.format('d'))]
            }) ${typeTime} ${momentDate.format('HH:mm')}`;
        }
        return `${momentDate.format('YY.MM.DD')} (${
            dateKr[parseInt(momentDate.format('d'))]
        })<br/>${typeTime} ${momentDate.format('HH:mm')}`;
    },
    formatLocalTimezone(date) {
        return moment
            .tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
            .format();
    },
    formatMoney(
        amount: string | number = 0,
        decimalCount = 2,
        decimal = '.',
        thousands = ','
    ): any {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? '-' : '';

            let i = parseInt(
                (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
            ).toString();
            let j = i.length > 3 ? i.length % 3 : 0;

            return (
                negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
                (decimalCount
                    ? decimal +
                      // @ts-ignore
                      Math.abs(amount - i)
                          .toFixed(decimalCount)
                          .slice(2)
                    : '')
            );
        } catch (e) {
            // console.log(e);
        }
    },
    formatDateTimeDay(
        dateTime: string,
        service: TranslateService,
        formatDate = 'YYYY.MM.DD',
        formatTime = 'HH:mm'
    ) {
        let dateFormat = moment(dateTime).format(formatDate);
        dateFormat += '(';
        let dayOfWeek = new Date(dateTime).getDay();
        dateFormat +=
            this.translate(service, 'primeng.dayNamesShort')[dayOfWeek] + ') ';
        dateFormat += moment(dateTime).format(formatTime);
        return dateFormat;
    },
    cleanObject(data) {
        let newData = Object.assign({}, data);
        for (var name in newData) {
            if (
                newData.hasOwnProperty(name) &&
                newData[name] === undefined &&
                newData[name] !== '0'
            ) {
                console.log(name, typeof newData[name]);
                delete newData[name];
            }
        }
        return newData;
    },
    getLaborCountrySortTypes(translateService: TranslateService): any {
        return this.translateList(
            translateService,
            ['label.id', 'label.fullname', 'label.email', 'label.phone_number'],
            {}
        ).pipe(
            map((trans) => {
                return [
                    {
                        code: 'id',
                        label: trans['label.id'],
                    },
                    {
                        code: 'name',
                        label: trans['label.fullname'],
                    },
                    {
                        code: 'email',
                        label: trans['label.email'],
                    },
                    {
                        code: 'telephoneNumber',
                        label: trans['label.phone_number'],
                    },
                ];
            })
        );
    },
    getRecruiterTypes(translateService: TranslateService): any {
        return this.translateList(
            translateService,
            [
                'label.recruiter_type_1',
                'label.recruiter_type_2',
                'label.recruiter_type_3',
                'label.recruiter_type_4',
                'label.recruiter_type_5',
                'label.recruiter_type_6',
            ],
            {}
        ).pipe(
            map((trans) => {
                let results = [];
                for (let i = 1; i <= 6; i++) {
                    results.push({
                        code: i - 1,
                        label: trans[`label.recruiter_type_${i}`],
                    });
                }

                return results;
            })
        );
    },
    getCompanyTypes(): any {
        return {
            businessType: [
                { value: 1, label: 'Th??ng t?? 200/2014/TT-BTC' },
                { value: 2, label: 'Th??ng t?? 133/2016/TT-BTC' },
            ],
            accordingAccountingRegime: [
                { value: 1, label: 'Ch???ng t??? ghi s???' },
                { value: 2, label: 'Nh???t k?? chung' },
            ],
            methodCalcExportPrice: [
                {
                    value: 1,
                    label: 'Gi?? v???n b??nh qu??n gia quy???n t???i th???i ??i???m xu???t kho',
                },
                { value: 2, label: 'Gi?? v???n b??nh qu??n gia quy???n cu???i k???' },
            ],
        };
    },
    getUserTypes(): any {
        return {
            unionMember: [
                { value: 1, label: 'Kh??ng c??' },
                { value: 2, label: '??o??n vi??n' },
                { value: 3, label: '?????ng vi??n' },
            ],
            isDemobilized: [
                { value: false, label: 'Kh??ng c??' },
                { value: true, label: 'B??? ?????i xu???t ng??' },
            ],
            literacy: [
                {
                    value: 1,
                    label: 'T???t nghi???p THPT',
                },
                { value: 2, label: 'T???t nghi???p THCS' },
                {
                    value: 3,
                    label: 'T???t nghi???p ti???u h???c',
                },
                { value: 4, label: 'ch??a h???c xong ti???u h???c' },
            ],
            literacyDetail: [
                { value: 1, label: 'Ch??a qua ????o t???o' },
                { value: 2, label: 'CNKT Kh??ng c?? b???ng' },
                { value: 3, label: 'S?? c???p' },
                { value: 4, label: 'trung c???p' },
                { value: 5, label: 'cao ?????ng' },
                { value: 6, label: '?????i h???c' },
                { value: 7, label: 'Th???c s??' },
                { value: 8, label: 'Ti???n s??' },
            ],
            status: [
                { value: false, label: 'K??ch ho???t' },
                { value: true, label: 'Ngh??? vi???c' },
            ],
        };
    },
    getBeginDeclareTypes(): any {
        return {
            dayType: [
                { value: '-', label: '-' },
                { value: '/', label: '/' },
            ],
            decimalUnit: [
                { value: ',', label: '"," (comma)' },
                { value: '.', label: '"." (dots)' },
            ],
            thousandUnit: [
                { value: '.', label: '"." (dots)' },
                { value: ',', label: '"," (comma)' },
            ],
        };
    },
    getUserSortTypes(translateService: TranslateService): any {
        return this.translateList(
            translateService,
            ['label.id', 'label.full_name', 'label.birthday'],
            {}
        ).pipe(
            map((trans) => {
                return [
                    {
                        code: 'id',
                        label: trans['label.id'],
                    },
                    {
                        code: 'fullName',
                        label: trans['label.full_name'],
                    },
                    {
                        code: 'birthday',
                        label: trans['label.birthday'],
                    },
                ];
            })
        );
    },
    getRoomTableSortTypes(translateService: TranslateService): any {
        return this.translateList(
            translateService,
            ['label.id', 'label.code', 'label.name'],
            {}
        ).pipe(
            map((trans) => {
                return [
                    {
                        code: 'id',
                        label: trans['label.id'],
                    },
                    {
                        code: 'code',
                        label: trans['label.code'],
                    },
                    {
                        code: 'name',
                        label: trans['label.name'],
                    },
                ];
            })
        );
    },
    getSortTypes(translateService: TranslateService): any {
        return this.translateList(
            translateService,
            ['label.ascending', 'label.descending'],
            {}
        ).pipe(
            map((trans) => {
                return [
                    {
                        code: false,
                        label: trans['label.ascending'],
                    },
                    {
                        code: true,
                        label: trans['label.descending'],
                    },
                ];
            })
        );
    },
};

export default AppUtil;
