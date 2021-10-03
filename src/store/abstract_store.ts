import EventEmitter from "eventemitter3";

enum StoreUpdateEmitter {
  UPDATED = "UPDATED",
}

export abstract class AbstractStore<Data extends {}, AdaptedData extends {}> {
  private currentData: Data;
  private updateEmitter: EventEmitter<StoreUpdateEmitter> = new EventEmitter();

  constructor(private readonly initialData: Data) {
    this.currentData = initialData;
  }

  public reset(): void {
    this.updateEmitter.removeAllListeners();
    this.currentData = this.initialData;
  }

  public produceNewData(producer: (currentData: Data) => Data): void {
    this.currentData = producer(this.currentData);
    this.updateEmitter.emit(StoreUpdateEmitter.UPDATED);
  }

  public getCurrentData(): Data {
    return this.currentData;
  }

  public getCurrentDataAdapted(): AdaptedData {
    return this.adaptData(this.currentData);
  }

  public registerOnUpdateCallback(callback: () => void): void {
    this.updateEmitter.on(StoreUpdateEmitter.UPDATED, callback);
  }

  public removeOnUpdateCallback(callback: () => void): void {
    this.updateEmitter.off(StoreUpdateEmitter.UPDATED, callback);
  }
  protected abstract adaptData(data: Data): AdaptedData;
}
