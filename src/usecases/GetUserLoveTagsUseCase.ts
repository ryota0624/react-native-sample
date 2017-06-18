/**
 * Created by ryota on 2017/06/10.
 */
import {UserID} from "../domains/user/User";
import {UseCase} from "./UseCase";
import {TagRepository} from "../domains/tag/TagRepository";
import {Tag} from "../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/03.
 */
export interface GetFollowTagsArgs {
    userId: number;
}

export class GetUserLoveTagsUseCase extends UseCase<GetFollowTagsArgs, Tag[]> {
    constructor(private tagRepository: TagRepository) {
        super();
    }

    protected doCall({userId}: GetFollowTagsArgs) {
        return this.tagRepository.findUserLoves(new UserID(userId))
    }
}