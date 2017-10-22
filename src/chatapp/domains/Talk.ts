/**
 * Created by ryota on 2017/10/21.
 */


import {StringValue} from "../../modelingSupport/ValueObject";
import {UserId} from "./User";
export class TalkId extends StringValue {
}
export class Talk {
  constructor(readonly id: TalkId,
              readonly text: string,
              readonly createdUserId: UserId,
              readonly createdAt: Date,
              readonly goods: Goods,
              readonly hashTags: string[]) {
  }

  static factory(id: TalkId,
                 text: string,
                 createdUserId: UserId,
                 createdAt: Date,
                 goods: Goods,) {

    const hashTags = text.match(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー]+/g);

    return new Talk(
      id,
      text,
      createdUserId,
      createdAt,
      goods,
      hashTags as string[]
    )
  }

  good(userId: UserId) {
    return new Talk(
      this.id,
      this.text,
      this.createdUserId,
      this.createdAt,
      this.goods.append(new Good(userId)),
      this.hashTags
    );
  }

  editText(text: string) {
    return Talk.factory(this.id, text, this.createdUserId, this.createdAt, this.goods);
  }

  removeGood(userId: UserId) {
    return new Talk(
      this.id,
      this.text,
      this.createdUserId,
      this.createdAt,
      this.goods.remove(new Good(userId)),
      this.hashTags
    );
  }
}

export class Good {
  constructor(readonly userId: UserId) {
  }
}

export class Goods {
  constructor(private values: Good[]) {
  }

  get count(): number {
    return this.values.length
  }

  append(good: Good) {
    return new Goods(([] as Good[]).concat(this.values, good));
  }

  remove(good: Good) {
    return new Goods(([] as Good[]).filter(g => g.userId.equals(good.userId)));
  }

  users(): UserId[] {
    return this.values.map(g => g.userId);
  }
}