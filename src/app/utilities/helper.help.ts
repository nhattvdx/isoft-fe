import { Injectable } from "@angular/core";
import Big from "big.js";
import * as moment from "moment";

@Injectable()
export class Helper {
  constructor() { }

  public static readonly CODE = "code";
  public static readonly TOKEN_PLATFORM = "token-platform";
  public static readonly KEY_CURRENT_USER = "current-user";
  public static readonly GLOBAL_LOADING = "GLOBAL-LOADING";
  public static readonly KEY_LOAD_BILL = 'LOAD_BILL';

  public static readonly ROUTER_NAVIGATE_BACK = "/";
  public static readonly ROUTER_NAVIGATE_LOGIN = "/login";
  public static readonly ROUTER_NAVIGATE_REGISTER = "/register";
  public static readonly ROUTER_NAVIGATE_DASHBOARD = "/dashboard";

  public static DECIMAL_UNIT = ".";
  public static THOUSAND_UNIT = ",";
  public static DAY_TYPE = "/";

  /**
   * isString
   * @param str
   * @returns {boolean}
   */
  public static isString(str: any): boolean {
    if (typeof str === "string" || str instanceof String) {
      return true;
    }
    return false;
  }

  /**
   * isNumeric
   * @param numeric
   * @returns {boolean}
   */
  public static isNumeric(numeric: any): boolean {
    numeric = "" + numeric;
    return !isNaN(numeric) && !isNaN(parseFloat(numeric));
  }

  /**
   * isNullOrUndefined
   * @param property
   * @returns {boolean}
   */
  public static isNullOrUndefined(property: any): boolean {
    if (property === undefined || property === null || property === "") {
      return true;
    }
    return false;
  }

  /**
   * removeThousandSeparators
   * @param amount
   * @returns {string}
   */
  public static removeThousandSeparators(amount: string): string {
    if (amount && typeof amount === "string") {
      return amount.replace(/,/g, "");
    }
    return amount;
  }

  /**
   * multiply
   * @param number1
   * @param number2
   * @returns {number}
   */
  public static multiply(
    number1: string | number,
    number2: string | number
  ): number {
    return +Big(number1).times(number2).valueOf();
  }

  /**
   * divide
   * @param number1
   * @param number2
   * @returns {number}
   */
  public static divide(
    number1: string | number,
    number2: string | number
  ): number {
    return +Big(number1).div(number2).valueOf();
  }

  /**
   * subtract
   * @param number1
   * @param number2
   * @returns {number}
   */
  public static subtract(
    number1: string | number,
    number2: string | number
  ): number {
    return +Big(number1).minus(number2).valueOf();
  }

  /**
   * plus
   * @param number1
   * @param number2
   * @returns {number}
   */
  public static plus(
    number1: string | number,
    number2: string | number
  ): number {
    return +Big(number1).plus(number2).valueOf();
  }

  /**
   * numberCutTo
   * @param number
   * @param decimal
   * @returns {number}
   */
  public static numberCutTo(
    number: string | number,
    decimal: number = 2
  ): number {
    return +Big(number).toFixed(decimal).valueOf();
  }

  /**
   * roundTo
   * @param number
   * @param decimal
   * @param roundMode // 0 = Down, 3 = Up
   * @returns {number}
   */
  public static roundTo(
    number: string | number,
    decimal: number = 2,
    roundMode: number = 0
  ): number {
    return +Big(number).round(decimal, roundMode).valueOf();
  }

  /**
   * convertMoney
   * @param value
   * @param decimal
   * @returns {string}
   */
  public static convertMoney(
    value: string | number,
    decimal: string = ","
  ): string {
    let format = undefined;
    if (decimal === ",") {
      format = "de-DE";
    } else if (decimal === ".") {
      format = "en-US";
    }
    const val: string = value.toLocaleString(format, {
      minimumFractionDigits: 2,
    });
    return val;
  }

  /**
   * setStorage
   * @param key
   * @param value
   */
  public static setStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * getStorage
   * @param key
   * @returns {string}
   */
  public static getStorage(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * removeStorage
   * @param key
   */
  public static removeStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * clearStorageAll
   */
  public static clearStorageAll(): void {
    localStorage.clear();
  }

  /**
   * getMilliseconds
   */
  public static getMilliseconds(): number {
    return moment().valueOf();
  }

  /**
   * convertDateWithType
   * @param date
   * @param dayType
   * @returns {string}
   */
  public static convertDateWithType(
    date: Date | number | string,
    dayType: string = Helper.DAY_TYPE
  ): string {
    const format: string = `DD${dayType}MM${dayType}YYYY`;
    const day: string = moment(date).format(format);
    return day;
  }

  public static convertStringToDate(date:string):Date{
    const dateNow = new Date();
    if (!date) {
      return new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDay(),0,0,0,0);
    }
    const dateSplit = date.split('/');
    if (dateSplit?.length >= 3) {
      try {
        return new Date(Number(dateSplit[2]),Number(dateSplit[1]) - 1,Number(dateSplit[0]));
      } catch (error) {
        return new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDay(),0,0,0,0);
      }
    }else{
      return new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDay(),0,0,0,0);
    }
  }

  public static getDaysArray(fromDate: Date, toDate: Date) {
    const names = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    let result = [];
    let listSortDate = [];
    while (fromDate <= toDate) {
      result.push({
        day:
          names[fromDate.getDay()] +
          `- ${fromDate.getDate()}/${fromDate.getMonth() + 1}`,
        dateInMonth: fromDate.getDate(),
        date: moment(fromDate),
      });
      fromDate.setDate(fromDate.getDate() + 1);
    }

    result.forEach((item) => {
      listSortDate.push(item.date);
    });

    listSortDate.sort((a: any, b: any) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    result.forEach((item, index) => {
      item.date = moment(listSortDate[index]);
    });

    return result;
  }

  public static count2Day(fromDate: Date, toDate: Date) {
    var oneDay = 24 * 60 * 60 * 1000;
    return Math.round(
      Math.abs((fromDate.getTime() - toDate.getTime()) / oneDay)
    );
  }

  public static arrayDiff(a1: any[], a2: any[]): any[] {
    var a = [];
    var diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }

    return diff;
  }

  /**
   * @description set sessionStorage
   */
  public static setSessionStorage(key: SESSION_STORAGE_KEYS, value: string | number): void {
    sessionStorage.setItem(key, value.toString());
  }

  /**
   * get session
   */
  public static getSessionStorage(key: SESSION_STORAGE_KEYS): string {
    return sessionStorage.getItem(key);
  }

  /**
   * remove session
   */
  public static removeSessionStorage(key: SESSION_STORAGE_KEYS): void {
    sessionStorage.removeItem(key);
  }

  /**
   * clear sessionStorage
   */
  public static clearSessionStorage(): void {
    sessionStorage.clear();
  }

  public static textTruncate(text: string, max: number) {
    if ((text || '') == '') return text;
    if (text.length <= max) return text;
    return text.slice(0, max - 1) + '...';
  }
}

export enum SESSION_STORAGE_KEYS {
  JOB_SELECTED_ID = 'JOB_SELECTED_ID',
  STATUS_SELECTED_ID = 'STATUS_SELECTED_ID',
}
