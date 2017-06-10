/**
 * Created by ryota on 2017/06/03.
 */
import {EventEmitter} from 'events';
export abstract class UseCase<I, O> {
  protected onResultListener: ((result: O) => void)[] = [];
  protected onFailListener: ((err: Error) => void)[] = [];
  protected onStartListener: (() => void)[] = [];
  static execute<I, O>(args: I, usecase: UseCase<I, O>) {
    usecase.emitStart();
    usecase.doCall(args)
      .then(result => {
        usecase.emitResult(result);
      }).catch(error => {
        usecase.emitFail(error);
    });
  }
  protected abstract doCall(args: I): Promise<O>;
  onStart(fn: () => void) {
    const len = this.onStartListener.push(fn);
    return () => {
      this.onStartListener.slice(len, 1);
    }
  }
  onResult(fn: (result: O) => void) {
    const len = this.onResultListener.push(fn);
    return () => {
      this.onResultListener.slice(len, 1);
    }
  }
  onFail(fn: (error: Error) => void) {
    const len = this.onFailListener.push(fn);
    return () => {
      this.onFailListener.slice(len, 1)
    }
  }

  protected emitStart() {
    this.onStartListener.forEach(listener => listener());
  }
  protected emitResult(result: O) {
    this.onResultListener.forEach(listener => listener(result));
  }
  protected emitFail(err: Error) {
    this.onFailListener.forEach(listener => listener(err));
  }
}