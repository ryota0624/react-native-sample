/**
 * Created by ryota on 2017/06/04.
 */
import {UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicReadRepository} from "../domains/topic/TopicRepository";
import {Topic} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";

export interface UserFollowTopicArgs {
  userId: number;
  topicId: number;
}

export class GetUserFollowTopics extends UseCase<UserFollowTopicArgs, Topic[]> {
  constructor(private topicRepository: TopicReadRepository, private userRepository: UserRepository) {
    super();
  }

  protected doCall({userId}: UserFollowTopicArgs) {
    return this.userRepository.findById(new UserID(userId))
      .then(user => this.topicRepository.findUserFollows(user.id))
  }
}

export interface UseGetUserFollowTopic {
  getUserFollowTopics: GetUserFollowTopics;
}