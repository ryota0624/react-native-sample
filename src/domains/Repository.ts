import {EventEmitter} from "eventemitter3";
/**
 * Created by ryota on 2017/06/03.
 */
// import {EventEmitter} from "events";

const change = "change_";
export abstract class Repository extends EventEmitter {
  subscribe(fn: () => void): () => void {
    this.addListener(change, fn);
    return () => this.removeListener(change, fn);
  }
  emitChange() {
    this.emit(change);
  }
}