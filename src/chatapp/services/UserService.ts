import {UserStore, applicationContext} from "../stores/Store";
import {User, UserId, Password, ImageUrl} from "../domains/User";
import {Validation, ValidationSuccess} from "../validations/Validateion";
import {EventEmitter} from "eventemitter3";
/**
 * Created by ryota on 2017/10/22.
 */

export abstract class Service<I> extends EventEmitter {
  private static onStartSymbol = "onStartSymbol";
  private static onFinishSymbol = "onFinishSymbol";

  private addStartListener(fn: (serviceType: Service<any>) => void): () => void {
    this.addListener(Service.onStartSymbol, fn);
    return () => this.removeListener(Service.onStartSymbol, fn);
  }

  private addFinishListener(fn: (serviceType: Service<any>) => void): () => void {
    this.addListener(Service.onFinishSymbol, fn);
    return () => this.removeListener(Service.onFinishSymbol, fn);
  }

  addExecuteListener({
    onStartServiceExecution,
    onFinishServiceExecution
  }: {
    onStartServiceExecution: (serviceType: any) => void,
    onFinishServiceExecution: (serviceType: any) => void
    }): () => void {
    const removeStart = this.addStartListener(onStartServiceExecution);
    const removeFinish = this.addFinishListener(onFinishServiceExecution);
    return () => {
      removeStart();
      removeFinish();
    }
  }


  protected applicationContext = applicationContext;
  abstract validation(input: I): Validation
  start(input: I): Error | undefined  {
    try {
      this.emit(Service.onStartSymbol, this.constructor);
     const validationResult = this.validation(input);
     if (validationResult.hasError()) {
       throw new Error(
         validationResult.messages.join("\n")
       );
     }

     this.execute(input);
    } catch(e) {
      return e;
    } finally {
      this.emit(Service.onFinishSymbol, this.constructor);
    }
  }
  abstract execute(input: I): void;
}
export interface UserRegisterServiceInput {
  userId: string,
  password: string,
  imgUrl: string
}
export class UserRegisterService extends Service<UserRegisterServiceInput> {
  constructor(protected userStore: UserStore) {
    super();
  }

  validation(input: UserRegisterServiceInput) {
    return this.existDuplicateIdValidate(input.userId);
  }

  execute({userId, password, imgUrl}: UserRegisterServiceInput) {
    const user = new User(
      new UserId(userId),
      new Password(password),
      new ImageUrl(imgUrl),
      new Date()
    );

    this.userStore.save(user);
  }

  existDuplicateIdValidate(userId: string): Validation {
    const existUser = this.userStore.findAll().some(user => user.id.value === userId);
    return Validation.require(!existUser, ["same id is already"])
  }
}

export class UserDeleteService extends Service<UserId> {
  constructor(protected userStore: UserStore) {
    super();
  }
  validation(userId: UserId) {
    return ValidationSuccess;
  }

  execute(userId: UserId) {
    this.userStore.deleteById(userId);
  }
}

type UserLoginServiceInput = {
  userId: UserId,
  password: Password
}
export class UserLoginService extends Service<UserLoginServiceInput> {
  constructor(protected userStore: UserStore) {
    super();
  }
  validation(_: UserLoginServiceInput) {
    return ValidationSuccess;
  }

  execute({userId, password}: UserLoginServiceInput) {
    const me = this.userStore.findAll().find((user) => user.id.value === userId.value);
    if (!me) {
      throw new Error("cant found user")
    }

    if (!password.equals(me.password)) {
      throw new Error("no match userId or password")
    }

    this.applicationContext.loginUser(me);
  }
}