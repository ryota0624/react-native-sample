/**
 * Created by ryota on 2017/06/03.
 */

import {Entity, EntityObject} from "../../modelingSupport/Entity";
import {Value} from "../../modelingSupport/ValueObject";

export class UserID extends Value<number> {}
export class UserName extends Value<string> {}

export class User implements Entity<UserID> {
  private constructor(
    public id: UserID,
    public name: UserName,
  ) {}
  static factory({id, name}: EntityObject<User>): Readonly<User> {
    return new User(id, name);
  }
}