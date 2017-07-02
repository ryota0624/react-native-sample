import {GetUserFollowTopicsUseCase} from "../../../usecases/GetUserFollowTopicsUseCase";
import {TopicReadRepository} from "../../../domains/topic/TopicRepository";
import {UserRepository} from "../../../domains/user/UserRepository";
import {UseCase} from "../../../usecases/UseCase";
import {FollowableTopicInteractor} from "../commonInteractor/FollowableTopicInteractor";
import TopicRepositoryOnMem from "../../../adaptors/Memory/TopicRepositoryOnMem";
import UserRepositoryOnMem from "../../../adaptors/Memory/UserRepositoryOnMem";
/**
 * Created by ryota on 2017/06/25.
 */


export interface IFollowedTopicsInteractor extends FollowableTopicInteractor {
    getFollowedTopic: () => GetUserFollowTopicsUseCase;
}

export abstract class FollowedTopicsInteractor extends FollowableTopicInteractor implements IFollowedTopicsInteractor {
    protected abstract topicRepository: TopicReadRepository;
    protected abstract userRepository: UserRepository;
    protected abstract userId: number;

    getFollowedTopic = () => {
        const useCase = new GetUserFollowTopicsUseCase(this.topicRepository, this.userRepository);
        UseCase.executeR(useCase, {userId: this.userId});
        return useCase;
    };
}

export class FollowedTopicsInteractorImpl extends FollowedTopicsInteractor {
    constructor(protected userId: number,
                protected topicRepository: TopicReadRepository = TopicRepositoryOnMem,
                protected userRepository: UserRepository = UserRepositoryOnMem) {
        super();
    }
}