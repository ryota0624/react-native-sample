/**
 * Created by ryota on 2017/06/10.
 */
/**
 * Created by ryota on 2017/06/10.
 */
import {User, UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicReadRepository} from "../domains/topic/TopicRepository";
import {Topic, TopicID} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";
import {TagRepository} from "../domains/tag/TagRepository";
import {Tag, TagName} from "../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */
export interface GetTagTopicsUseCaseArgs {
    tagName: TagName;
}

export class GetTagTopicsUseCase extends UseCase<GetTagTopicsUseCaseArgs, Topic[]> {
    constructor(
        private topicRepository: TopicReadRepository
    ) {
        super();
    }

    protected doCall({tagName}: GetTagTopicsUseCaseArgs) {
        return this.topicRepository.findByTagName(tagName)
    }
}