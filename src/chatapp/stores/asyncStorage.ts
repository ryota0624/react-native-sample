import {UserStore, TalkStore} from "./Store";
import {User, UserId, Password, ImageUrl} from "../domains/User";
import {AsyncStorage} from "react-native";
import {StringValue} from "../../modelingSupport/ValueObject";
import {Talk, TalkId, Goods} from "../domains/Talk";
/**
 * Created by ryota on 2017/10/21.
 */

interface AsyncStorageStore<E extends {id: StringValue}> {
  toIDString(e: StringValue): string
  toStringEntity(e: E): string
  stringToEntity(str: string): E
  storagePrefix: string
}

function loadFromAsyncStorage<E extends {id: StringValue}>(storage: AsyncStorageStore<E>): Promise<E[]> {
  return AsyncStorage.getAllKeys()
    .then((keys) => Array.from<string>(keys).filter(key => key.includes(storage.storagePrefix)))
    .then((keys) => AsyncStorage.multiGet(keys))
    .then(keyWithEntityArray => keyWithEntityArray.map(([_, entityJson]) => storage.stringToEntity(entityJson)))
}


export class UserStoreOnAsyncStorage extends UserStore implements AsyncStorageStore<User> {
  constructor() {
    super(new Map());
    loadFromAsyncStorage(this)
      .then(entities => {
      this.state = new Map<string, User>(
        entities.map(entity => [entity.id.value, entity] as [string, User])
      );
      this.emitChange();
    });
  }

  storagePrefix = "userStorage";

  stringToEntity(str: string): User {
    const {id, password, createdAt, imageUrl} = JSON.parse(str);
    return new User(
      new UserId(id.value),
      new Password(password.value),
      new ImageUrl(imageUrl.value),
      new Date(createdAt.value)
    )
  }

  save(entity: User) {
    super.save(entity);
    AsyncStorage.setItem(this.toIDString(entity.id), this.toStringEntity(entity));
  }

  deleteById(userId: UserId) {
    super.deleteById(userId);
    AsyncStorage.removeItem(this.toIDString(userId));
  }

  toIDString(id: UserId): string {
    return `${this.storagePrefix}-${id.value}`;
  }

  toStringEntity(entity: User): string {
    const plainJson = {
      id: entity.id,
      password: entity.password,
      createdAt: entity.createdAt.getTime(),
      imageUrl: entity.imageUrl
    };

    return JSON.stringify(plainJson);
  }
}

export const userStoreOnAsyncStorage = new UserStoreOnAsyncStorage();

export class TalkStoreOnAsyncStorage extends TalkStore implements AsyncStorageStore<Talk> {
  constructor() {
    super(new Map());
    loadFromAsyncStorage(this)
      .then(entities => {
        this.state = new Map<string, Talk>(
          entities.map(entity => [entity.id.value, entity] as [string, Talk])
        );
        this.emitChange();
      });
  }
  storagePrefix = "talkStorage";
  toIDString(id: TalkId): string {
    return `${this.storagePrefix}-${id.value}`;
  }

  save(entity: Talk) {
    super.save(entity);
    AsyncStorage.setItem(this.toIDString(entity.id), this.toStringEntity(entity));
  }

  deleteById(talkId: TalkId) {
    super.deleteById(talkId);
    AsyncStorage.removeItem(this.toIDString(talkId));
  }

  toStringEntity(entity: Talk): string {
    const plainJson = {
      id: entity.id,
      createdUserId: entity.createdUserId,
      createdAt: entity.createdAt.getTime(),
      text: entity.text,
      goods: entity.goods
    };

    return JSON.stringify(plainJson);
  }

  stringToEntity(str: string): Talk {
    const {id, createdUserId, createdAt, text, goods} = JSON.parse(str);
    return Talk.factory(
      new TalkId(id.value),
      text,
      new UserId(createdUserId.value),
      new Date(createdAt.value),
      new Goods(goods.value)
    )
  }

}
export const talkStoreOnAsyncStorage = new TalkStoreOnAsyncStorage();
