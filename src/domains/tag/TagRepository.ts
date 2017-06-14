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
  findById(tagId: TagName, userId: UserID): Promise<Tag>;
  findAll(): Promise<Tag[]>;
  findUserLoves(userId: UserID): Promise<Tag[]>;
  findTopicTags(topicId: TopicID, userId: UserID): Promise<Tag[]>;

}