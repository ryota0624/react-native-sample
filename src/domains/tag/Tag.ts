/**
 * Created by ryota on 2017/06/03.
 */
import {Entity, EntityObject} from "../../modelingSupport/Entity";
import {Value} from "../../modelingSupport/ValueObject";

export class TagName extends Value<string> {}
export enum LoveLevel {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3
}

export class Tag implements Entity<TagName> {
  private constructor(
    public id: TagName,
    public loveLevel: LoveLevel
  ) {}
  static factory({id, loveLevel}: EntityObject<Tag>): Readonly<Tag> {
    return new Tag(id, loveLevel);
  }
}

export function name(tag: Tag) {
  return tag.id.value;
}