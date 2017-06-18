/**
 * Created by ryota on 2017/06/11.
 */
import {UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {UseCase} from "./UseCase";
import {LoveLevel, Tag, TagName, updateLoveLevel} from "../domains/tag/Tag";
import {TagRepository} from "../domains/tag/TagRepository";

/**
 * Created by ryota on 2017/06/03.
 */
export interface UserLoveTagArgs {
    userId: number;
    tagName: string;
}

export class UserLoveTagUseCase extends UseCase<UserLoveTagArgs, TagName> {
    constructor(private tagRepository: TagRepository, private userRepository: UserRepository) {
        super();
    }

    onLoveLevel(callBack: (tag: Tag) => void) {
        this.addListener('onLoveLevel', callBack);
    }

    protected doCall({userId, tagName}: UserLoveTagArgs) {
        const userID = new UserID(userId);
        return Promise.all(
            [
                this.tagRepository.findById(new TagName(tagName), userID),
                this.userRepository.findById(userID)
            ])
            .then(([tag, user]) => {
                const updatedTag = updateLoveLevel(tag);
                this.emit('onLoveLevel', updatedTag);
                return this.userRepository.store(user, updatedTag)
            })
            .then(() => new TagName(tagName))
    }
}
