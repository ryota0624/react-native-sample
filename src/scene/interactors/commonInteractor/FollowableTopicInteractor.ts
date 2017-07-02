import {UserRepository} from "../../../domains/user/UserRepository";
import {TopicReadRepository} from "../../../domains/topic/TopicRepository";
import {UseCase} from "../../../usecases/UseCase";
import {UserUnFollowTopicUseCase} from "../../../usecases/UserUnFollowTopicUseCase";
import {UserFollowTopicUseCase} from "../../../usecases/UserFollowTopicUseCase";
/**
 * Created by ryota on 2017/06/25.
 */

export abstract class FollowableTopicInteractor {
    protected abstract topicRepository: TopicReadRepository;
    protected abstract userRepository: UserRepository;
    protected abstract userId: number;
    followTopic = (topicIdNum: number) => {
        const useCase = new UserFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.executeR(useCase, {userId: this.userId, topicId: topicIdNum});
        return useCase;
    };

    unFollowTopic = (topicIdNum: number) => {
        const useCase = new UserUnFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.executeR(useCase, {userId: this.userId, topicId: topicIdNum});
        return useCase;
    };

}