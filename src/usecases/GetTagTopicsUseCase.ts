/**
 * Created by ryota on 2017/06/10.
 */
/**
 * Created by ryota on 2017/06/10.
 */
import {User, UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicReadRepository} from "../domains/topic/TopicRepository";
import {TopicID} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";
import {TagRepository} from "../domains/tag/TagRepository";
import {Tag} from "../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */
export interface GetFollowTagsArgs {
    userId: number;
}

export class GetFollowTagsUseCase extends UseCase<GetFollowTagsArgs, Tag[]> {
    constructor(private tagRepository: TagRepository) {
        super();
    }

    protected doCall({userId}: GetFollowTagsArgs) {
        return this.tagRepository.findUserFollows(new UserID(userId))
    }
}