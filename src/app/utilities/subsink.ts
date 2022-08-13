const isFunction = (fn: any) => typeof fn === 'function';

export interface SubscriptionLike {
  unsubscribe(): void;
}

export class SubSink {
  protected _subs: SubscriptionLike[] = [];
  constructor() {}

  add(...subscriptions: SubscriptionLike[]): void {
    this._subs = this._subs.concat(subscriptions);
  }

  set sink(subscriptions: SubscriptionLike) {
    this._subs.push(subscriptions);
  }

  unsubscribe(): void {
    this._subs.forEach(sub => sub && isFunction(sub.unsubscribe) && sub.unsubscribe());
    this._subs = [];
  }
}