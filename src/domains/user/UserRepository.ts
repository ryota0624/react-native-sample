import {User, UserID} from "./User";
import {TopicID} from "../topic/Topic";
import {Repository} from "../Repository";
/**
 * Created by ryota on 2017/06/03.
 */

export interface UserRepository extends Repository {
  store(user: User): Promise<void>;
  findById(userId: UserID): Promise<User>;
  store(user: User, topicId: TopicID): Promise<void>;
  findAll(): Promise<User[]>
}