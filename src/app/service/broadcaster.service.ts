import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

interface BroadcastEvent {
    key: string;
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class BroadcasterService {
    private _eventBus: Subject<BroadcastEvent>;
    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    public broadcast(key: string, data?: any): void {
        this._eventBus.next({ key, data });
    }

    public on<T>(key: string): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter((event) => event.key === key),
            map((event) => <T>event.data)
        );
    }
}
