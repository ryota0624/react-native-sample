import {UseCase} from "./UseCase";
import {Topic} from "../domains/topic/Topic";
import {TopicReadRepository} from "../domains/topic/TopicRepository";
import {UserRepository} from "../domains/user/UserRepository";
import {UserID} from "../domains/user/User";
/**
 * Created by ryota on 2017/06/08.
 */

export interface GetUserCreatedTopicUseCaseArgs {
  userId: number
}

export class GetUserCreatedTopicUseCase extends UseCase<GetUserCreatedTopicUseCaseArgs, Topic[]> {
  constructor(
    private userRepository: UserRepository,
    private topicRepository: TopicReadRepository) {
    super();
  }

  protected doCall({userId:userIdRaw}: GetUserCreatedTopicUseCaseArgs) {
    const userId = new UserID(userIdRaw);
    return this.userRepository.findById(new UserID(userIdRaw))
      .then(user => this.topicRepository.findAll())
      .then(topics => topics.filter(topic => topic.createdUserId.equals(userId)))
  }
}