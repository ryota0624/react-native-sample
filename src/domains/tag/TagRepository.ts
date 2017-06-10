import {Repository} from "../Repository";
import {Tag, TagName} from "./Tag";
import {TopicID} from "../topic/Topic";
import {UserID} from "../user/User";
/**
 * Created by ryota on 2017/06/04.
 */

export interface TagRepository extends Repository {
  store(tag: Tag): Promise<void>;
  bulkStore(tags: Tag[]): Promise<void>
  findById(tagId: TagName): Promise<Tag>;
  store(tag: Tag): Promise<void>;
  findAll(): Promise<Tag[]>;
  findUserFollows(userId: UserID): Promise<Tag[]>;
  findTopicTags(topicId: TopicID): Promise<Tag[]>;

}