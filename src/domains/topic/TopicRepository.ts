import {Topic, TopicID} from "./Topic";
import {UserID} from "../user/User";
import {Repository} from "../Repository";
import {TagName} from "../tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */

export interface TopicReadRepository extends Repository {
  findById(topicId: TopicID): Promise<Topic>;
  findAll(): Promise<Topic[]>;
  findUserFollows(userId: UserID): Promise<Topic[]>
}

export interface TopicWriteRepository {
  store(topic: Topic, tagIds: TagName[]): Promise<void>;
}