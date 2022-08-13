export function DateToUnix(date: any): any {
    if (date == null) {
        return 0;
    } else {
        return new Date(date).getTime() / 1000;
    }
}
export function UnixToDate(unix: number): Date | null {
    if (unix !== undefined && unix !== null && unix !== 0) {
        return new Date(unix * 1000);
    }
    return null;
}
