import {TagRepository} from "../../domains/tag/TagRepository";
import {Repository} from "../../domains/Repository";
import {Tag, TagName, LoveLevel} from "../../domains/tag/Tag";
import {TopicID} from "../../domains/topic/Topic";
import {TopicRepositoryOnMem} from "./TopicRepositoryOnMem";
import {UserID} from "../../domains/user/User";
/**
 * Created by ryota on 2017/06/04.
 */

let tagMaps: Map<string, Tag> = new Map();
let userTagLoveLevel: [UserID, [TagName, LoveLevel]][] = [];
export class TagRepositoryOnMem extends Repository implements TagRepository {
  store(tag: Tag): Promise<void> {
    tagMaps.set(tag.id.value, tag);
    return Promise.resolve();
  }
  bulkStore(tags: Tag[]): Promise<void> {
    return Promise.all(tags.map(this.store)).then(() => {});
  }

  findById(id: TagName): Promise<Tag> {
    const tag = tagMaps.get(id.value);
    if (tag) {
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

  findTopicTags(topic: TopicID) {
    const tagsP = TopicRepositoryOnMem.topicRelTag.map(([topicId, tagName]) => {
      if (topicId.equals(topic)) {
        return this.findById(tagName);
      }
      return null;
    }).filter(p => p instanceof Promise) as Promise<Tag>[];

    return Promise.all(tagsP);
  }
}

export default new TagRepositoryOnMem();