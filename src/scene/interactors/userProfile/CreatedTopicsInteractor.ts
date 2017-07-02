/**
 * Created by ryota on 2017/06/25.
 */
import {GetUserCreatedTopicUseCase} from "../../../usecases/GetUserCreatedTopicUseCase";
import {TopicReadRepository} from "../../../domains/topic/TopicRepository";
import {UserRepository} from "../../../domains/user/UserRepository";
import {UseCase} from "../../../usecases/UseCase";
import {FollowableTopicInteractor} from "../commonInteractor/FollowableTopicInteractor";
import TopicRepositoryOnMem from "../../../adaptors/Memory/TopicRepositoryOnMem";
import UserRepositoryOnMem from "../../../adaptors/Memory/UserRepositoryOnMem";

export interface ICreatedTopicsInteractor extends FollowableTopicInteractor {
    getCreatedTopic: () => GetUserCreatedTopicUseCase;
}

export abstract class CreatedTopicsInteractor extends FollowableTopicInteractor implements ICreatedTopicsInteractor {
    protected abstract topicRepository: TopicReadRepository;
    protected abstract userRepository: UserRepository;
    protected abstract userId: number;
    getCreatedTopic = () => {
        const useCase = new GetUserCreatedTopicUseCase(this.userRepository, this.topicRepository);
        UseCase.executeR(useCase, {userId: this.userId});
        return useCase;
    };
}

export class CreatedTopicsInteractorImpl extends CreatedTopicsInteractor {
    constructor(protected userId: number,
                protected topicRepository: TopicReadRepository = TopicRepositoryOnMem,
                protected userRepository: UserRepository = UserRepositoryOnMem,) {
        super();
    }
}