/**
 * Created by ryota on 2017/06/25.
 */

import {GetTagTopicsUseCase} from "../../../usecases/GetTagTopicsUseCase";
import {TopicReadRepository} from "../../../domains/topic/TopicRepository";
import {UserRepository} from "../../../domains/user/UserRepository";
import {UseCase} from "../../../usecases/UseCase";
import {FollowableTopicInteractor} from "../commonInteractor/FollowableTopicInteractor";
import {TagName} from "../../../domains/tag/Tag";
import TopicRepositoryOnMem from "../../../adaptors/Memory/TopicRepositoryOnMem";
import UserRepositoryOnMem from "../../../adaptors/Memory/UserRepositoryOnMem";

export interface ITagTopicsInteractor extends FollowableTopicInteractor {
    getTagTopics: (tagName: TagName) => GetTagTopicsUseCase;
}

export abstract class TagTopicsInteractor extends FollowableTopicInteractor implements ITagTopicsInteractor {
    protected abstract topicRepository: TopicReadRepository;
    protected abstract userRepository: UserRepository;
    protected abstract userId: number;
    getTagTopics = (tagName: TagName) => {
        const useCase = new GetTagTopicsUseCase(this.topicRepository);
        UseCase.executeR(useCase, {tagName});
        return useCase;
    };
}

export class TagTopicsInteractorImpl extends TagTopicsInteractor {
    constructor(protected userId: number,
                protected topicRepository: TopicReadRepository = TopicRepositoryOnMem,
                protected userRepository: UserRepository = UserRepositoryOnMem) {
        super();
    }
}