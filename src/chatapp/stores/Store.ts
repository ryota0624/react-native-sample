/**
 * Created by ryota on 2017/10/21.
 */
import {EventEmitter} from "eventemitter3"
import {StringValue} from "../../modelingSupport/ValueObject";
import {User, UserId} from "../domains/User";
import {Talk} from "../domains/Talk";

const onChange = "onChange";

abstract class Store<E extends {id: StringValue}> extends EventEmitter {
  protected state: Map<string, E>;
  constructor(initialState: Map<string, E>) {
    super();
    this.state = initialState;
  }
  save(entity: E) {
    this.state.set(entity.id.value, entity);
    this.emitChange();
  }

  deleteById(id: StringValue) {
    this.state.delete(id.value);
    this.emitChange();
  }

  findAll(): E[] {
    return Array.from(this.state.values()) as E[];
  }

  findById(id: StringValue): E | undefined {
    return this.findAll().find((e) => e.id.equals(id));
  }
  addChangeListener(fn: () => void) {
    this.addListener(onChange, fn);
  }

  removeChangeListener(fn: () => void) {
    this.removeListener(onChange, fn);
  }

  protected emitChange() {
    this.emit(onChange);
  }
}

export abstract class UserStore extends Store<User> {
}

export class ApplicationContext extends EventEmitter {
  protected me?: User;

  loginUser(me: User): void {
    this.me = me;
    this.emit(this.onLoginStr);
  }
  private onLoginStr = "onLogin";
  onLogin(fn: () => void) {
    this.addListener(this.onLoginStr, fn);
  }

  removeOnLogin(fn: () => void) {
    this.removeListener(this.onLoginStr, fn);
  }

  isLogin(): boolean {
    return this.me !== undefined;
  }

  get loginedUser(): User {
    if (!this.me) {
      throw new Error("no login User");
    }
    return this.me;
  }

  logout(): void {
    this.me = undefined;
  }
}
export const applicationContext = new ApplicationContext();


export abstract class TalkStore extends Store<Talk> {}