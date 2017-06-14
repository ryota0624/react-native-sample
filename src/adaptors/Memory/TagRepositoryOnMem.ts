import {TagRepository} from "../../domains/tag/TagRepository";
import {Repository} from "../../domains/Repository";
import {Tag, TagName, LoveLevel} from "../../domains/tag/Tag";
import {TopicID} from "../../domains/topic/Topic";
import {TopicRepositoryOnMem} from "./TopicRepositoryOnMem";
import {UserID} from "../../domains/user/User";
import {UserRepositoryOnMem} from "./UserRepositoryOnMem";
/**
 * Created by ryota on 2017/06/04.
 */

let tagMaps: Map<string, Tag> = new Map([
  ["お札", Tag.factory({id: new TagName('お札'), loveLevel: LoveLevel.Zero}) as Tag],
  ['小銭', Tag.factory({id: new TagName('小銭'), loveLevel: LoveLevel.Zero}) as Tag],
]);

export class TagRepositoryOnMem extends Repository implements TagRepository {
  store(tag: Tag): Promise<void> {
    tagMaps.set(tag.id.value, tag);
    return Promise.resolve();
  }
  bulkStore(tags: Tag[]): Promise<void> {
    return Promise.all(tags.map(this.store)).then(() => {});
  }

  findById(id: TagName, userId: UserID): Promise<Tag> {
    const tag = tagMaps.get(id.value);
    if (tag) {
      if (userId) {
        const tagLoveLevel = UserRepositoryOnMem.userLoveTags.find(([userIdNum, {tagName}]) => {
          return userId.equals(new UserID(userIdNum)) && tag.id.equals(new TagName(tagName));
        });
        if (tagLoveLevel) {
          return Promise.resolve(Tag.factory({...tag, loveLevel: tagLoveLevel[1].loveLevel}));
        }
      }
      return Promise.resolve(tag);
    }
    return Promise.reject(`not found tag ${id}`);
  }

  findAll(): Promise<Tag[]> {
    let tags: Tag[] = [];
    tagMaps.forEach(tag => {
      tags.push(tag);
    });

    return Promise.resolve(tags);
  }

  findUserLoves(userId: UserID): Promise<Tag[]> {
    const userLoveTagNames = UserRepositoryOnMem.userLoveTags.filter(([userIdNumber, {loveLevel}]) => {
      return userId.value === userIdNumber && loveLevel > LoveLevel.Zero;
    }).map(([_, {tagName}]) => {
      return new TagName(tagName);
    });

    return Promise.all(userLoveTagNames.map((tagName) => this.findById(tagName, userId)));
  }

  findTopicTags(topic: TopicID, userID: UserID) {
    const tagsP = TopicRepositoryOnMem.topicRelTag.map(([topicId, tagName]) => {
      if (topicId.equals(topic)) {
        return this.findById(tagName, userID);
      }
      return null;
    }).filter(p => p instanceof Promise) as Promise<Tag>[];

    return Promise.all(tagsP);
  }
}

export default new TagRepositoryOnMem();