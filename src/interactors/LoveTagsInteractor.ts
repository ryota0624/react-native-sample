import {Tag, TagName} from "../domains/tag/Tag";
import {TagRepository} from "../domains/tag/TagRepository";
import {UserRepository} from "../domains/user/UserRepository";
import {UserLoveTagArgs, UserLoveTagUseCase} from "../usecases/UserLoveTagUseCase";
import {UseCase} from "../usecases/UseCase";
import TagRepositoryOnMem from "../adaptors/Memory/TagRepositoryOnMem";
import UserRepositoryOnMem from "../adaptors/Memory/UserRepositoryOnMem";
/**
 * Created by ryota on 2017/06/18.
 */
export interface LoveTagsInteractor {
    changeLoveLevel(tagName: TagName): UserLoveTagUseCase
}

export abstract class LoveTagsInteractorAbs implements LoveTagsInteractor {
    abstract tagRepository: TagRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;
    changeLoveLevel = (tagName: TagName) => {
        const useCase = new UserLoveTagUseCase(this.tagRepository, this.userRepository);
        UseCase.executeR<UserLoveTagArgs, TagName>(useCase, {
            userId: this.userId,
            tagName: tagName.value,
        });

        return useCase;
    }
}

export class LoveTagsInteractorImpl extends LoveTagsInteractorAbs {
    tagRepository = TagRepositoryOnMem;
    userRepository = UserRepositoryOnMem;
    userId = 10
}