import {CreateTopicArgs, CreateTopicUseCase, TopicDTO} from "../../usecases/CreateTopicUseCase";
import {TopicWriteRepository} from "../../domains/topic/TopicRepository";
import {TagRepository} from "../../domains/tag/TagRepository";
import {UseCase} from "../../usecases/UseCase";
import {TagName} from "../../domains/tag/Tag";
import TopicRepositoryOnMem from "../../adaptors/Memory/TopicRepositoryOnMem";
import TagRepositoryOnMem from "../../adaptors/Memory/TagRepositoryOnMem";
/**
 * Created by ryota on 2017/06/25.
 */
export interface ICreateTopicInteractor {
    createTopic: (topicDto: TopicDTO, tagNames: TagName[]) => CreateTopicUseCase;
}

export abstract class CreateTopicInteractor implements ICreateTopicInteractor {
    abstract topicRepository: TopicWriteRepository;
    abstract tagRepository: TagRepository;
    abstract userId: number;
    createTopic = (topicDto: TopicDTO, tagNames: TagName[]) => {
        const useCase = new CreateTopicUseCase(this.topicRepository, this.tagRepository);
        UseCase.executeR(useCase, {
            userId: this.userId,
            topicDto,
            tagNames,
        });
        return useCase;
    }
}

export class CreateTopicInteractorImpl extends CreateTopicInteractor {
    constructor(public userId: number,
                public topicRepository: TopicWriteRepository = TopicRepositoryOnMem,
                public tagRepository: TagRepository = TagRepositoryOnMem,) {
        super();
    }
}