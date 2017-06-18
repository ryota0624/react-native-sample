import {Tag, TagName} from "../domains/tag/Tag";
import {TagRepository} from "../domains/tag/TagRepository";
import {UserRepository} from "../domains/user/UserRepository";
import {UserLoveTagArgs, UserLoveTagUseCase} from "../usecases/UserLoveTagUseCase";
import {UseCase} from "../usecases/UseCase";
import TagRepositoryOnMem from "../adaptors/Memory/TagRepositoryOnMem";
import UserRepositoryOnMem from "../adaptors/Memory/UserRepositoryOnMem";
import {GetUserLoveTagsUseCase} from "../usecases/GetUserLoveTagsUseCase";
/**
 * Created by ryota on 2017/06/18.
 */
export abstract class LoveTagsInteractor {
    abstract tagRepository: TagRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;
    abstract changeLoveLevel: (tagName: TagName) => UserLoveTagUseCase;
    abstract getLoveTags: () => GetUserLoveTagsUseCase;
}

export class LoveTagsInteractorImpl extends LoveTagsInteractor {
    tagRepository = TagRepositoryOnMem;
    userRepository = UserRepositoryOnMem;
    userId = 10;
    changeLoveLevel = (tagName: TagName) => {
        const useCase = new UserLoveTagUseCase(this.tagRepository, this.userRepository);
        UseCase.executeR<UserLoveTagArgs, TagName>(useCase, {
            userId: this.userId,
            tagName: tagName.value,
        });

        return useCase;
    };
    getLoveTags = () => {
        const useCase = new GetUserLoveTagsUseCase(this.tagRepository);
        UseCase.execute({userId: this.userId}, useCase);
        return useCase;
    }
}

