import EventEmitter from "eventemitter3";

interface ServerDataConfig<ServerResponse extends {}> {
  fetch: () => Promise<ServerResponse>;
}

enum ServerDataUpdateEmitter {
  UPDATED = "UPDATED",
}

/**
 * This server data can be implemented if you want to fetch data while suspending react components.
 *
 * The public `get` method will throw a suspending promise if the data is still pending upon accessing it.
 */
export class ServerData<ServerResponse extends {}> {
  private response: ServerResponse | undefined;
  private fetchPromise: Promise<ServerResponse> | undefined;
  private fetchError: Promise<any> | undefined;
  private updateEmitter: EventEmitter<ServerDataUpdateEmitter> =
    new EventEmitter();

  constructor(private readonly config: ServerDataConfig<ServerResponse>) {
    this.wrapFetch();
  }

  private wrapFetch(force: boolean = false): void {
    if (!this.response || force) {
      this.fetchPromise = this.config.fetch().then(
        (result) => this.onFetchPromiseResult(result),
        (error) => (this.fetchError = error)
      );
    }
  }

  private onFetchPromiseResult(result: ServerResponse): void {
    this.response = result;
    this.fetchPromise = undefined;
    this.updateEmitter.emit(ServerDataUpdateEmitter.UPDATED);
  }

  public get(): ServerResponse {
    if (this.fetchError) {
      throw this.fetchError;
    } else if (this.fetchPromise) {
      throw this.fetchPromise;
    }
    return this.response ?? ({} as ServerResponse);
  }

  public refresh(): void {
    this.fetchError = undefined;
    this.fetchPromise = undefined;
    this.wrapFetch(true);
  }

  public registerOnUpdateCallback(callback: () => void): void {
    this.updateEmitter.on(ServerDataUpdateEmitter.UPDATED, callback);
  }

  public removeOnUpdateCallback(callback: () => void): void {
    this.updateEmitter.off(ServerDataUpdateEmitter.UPDATED, callback);
  }
}
