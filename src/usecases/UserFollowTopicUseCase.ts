import {UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicReadRepository} from "../domains/topic/TopicRepository";
import {TopicID} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";
/**
 * Created by ryota on 2017/06/03.
 */
export interface UserFollowTopicArgs {
  userId: number;
  topicId: number;
}

export class UserFollowTopicUseCase extends UseCase<UserFollowTopicArgs, TopicID> {
  constructor(private topicRepository: TopicReadRepository, private userRepository: UserRepository) {
    super();
  }

  protected doCall({userId, topicId}: UserFollowTopicArgs) {
    return Promise.all(
      [
        this.topicRepository.findById(new TopicID(topicId)),
        this.userRepository.findById(new UserID(userId))
      ])
      .then(([topic, user]) => this.userRepository.store(user, topic.id))
      .then(() => new TopicID(topicId));
  }
}