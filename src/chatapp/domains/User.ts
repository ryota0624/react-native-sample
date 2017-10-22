/**
 * Created by ryota on 2017/10/21.
 */

import {StringValue} from "../../modelingSupport/ValueObject";


export class UserId extends StringValue {}
export class Password extends StringValue {}
export class ImageUrl extends StringValue {}

export class User {
  constructor(
    readonly id: UserId,
    readonly password: Password,
    readonly imageUrl: ImageUrl,
    readonly createdAt: Date
  ) {}
}