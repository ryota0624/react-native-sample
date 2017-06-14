import {Loading, ViewModel, ViewStateModel} from "../ViewModel";
import {UseCase} from "../../usecases/UseCase";
import {UserRepository} from "../../domains/user/UserRepository";
import {GetUserLoveTagsUseCase} from "../../usecases/GetUserLoveTagsUseCase";
import {TagRepository} from "../../domains/tag/TagRepository";
import {Tag, TagName} from "../../domains/tag/Tag";
import {UserLoveTagArgs, UserLoveTagUseCase} from "../../usecases/UserLoveTagUseCase";
/**
 * Created by ryota on 2017/06/10.
 */

export interface LoveTagsState {
    tags: Tag[];
    loading: Loading;
}

export interface LoveTagsAction {
    loveTag: (tagNameStr: string) => void;
    transitionToTagTopics: (tagNameStr: string) => void;
}

export abstract class LoveTags extends ViewModel {
    abstract tagRepository: TagRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;
    tags: Tag[] = [];
    loading: Loading = Loading.Initial;
    private state: LoveTagsState;

    loveTag = (tagNameStr: string) => {
        const useCase = new UserLoveTagUseCase(this.tagRepository, this.userRepository);
        UseCase.executeR<UserLoveTagArgs, TagName>(useCase, {
            userId: this.userId,
            tagName: tagNameStr,
        });

        useCase.onLoveLevel((loveLevelUpdatedTag: Tag) => {
            this.tags = this.tags.map(tag => {
                if (tag.id.equals(loveLevelUpdatedTag.id)) {
                    return loveLevelUpdatedTag;
                }
                return tag;
            });
            this.viewUpdate();
        });
    };

    transitionToTagTopics = (tagNameStr: string) => {
        console.log('wip transition to')
    };

    getLoveTags = () => {
        console.log("getTags");

        const useCase = new GetUserLoveTagsUseCase(this.tagRepository);
        UseCase.execute({userId: this.userId}, useCase);
        useCase.onStart(() => {
            this.loading = Loading.Initial;
            this.viewUpdate()
        });

        useCase.onResult(tags => {
            this.tags = tags;
            this.loading = Loading.Fulfill;
            this.viewUpdate();
        });
    }
}


export abstract class LoveTagsF extends ViewStateModel<LoveTagsState, LoveTagsAction> implements LoveTagsAction {
    abstract tagRepository: TagRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;

    constructor() {
        super();
    }

    get initialState() {
        return {
            tags: [],
            loading: Loading.Initial,
        }
    }

    get viewActions() {
        return {
            loveTag: this.loveTag,
            transitionToTagTopics: this.transitionToTagTopics
        }
    }

    transitionToTagTopics = (tagNameStr: string) => {
        console.log('wip transition to')
    };

    loveTag = (tagNameStr: string) => {
        const useCase = new UserLoveTagUseCase(this.tagRepository, this.userRepository);
        UseCase.executeR<UserLoveTagArgs, TagName>(useCase, {
            userId: this.userId,
            tagName: tagNameStr,
        });

        useCase.onLoveLevel((loveLevelUpdatedTag: Tag) => {
            this.updater((state, update) => {
                const nextTags = state.tags.map(tag => {
                    if (tag.id.equals(loveLevelUpdatedTag.id)) {
                        return loveLevelUpdatedTag;
                    }
                    return tag;
                });

                update({...state, tags: nextTags})
            });
        });
    };

    getLoveTags = () => {
        const useCase = new GetUserLoveTagsUseCase(this.tagRepository);
        UseCase.execute({userId: this.userId}, useCase);
        useCase.onStart(() => {
            this.updater((state, update) => {
                const nextState = {...state, loading: Loading.Initial};
                update(nextState);
            });
        });

        useCase.onResult(tags => {
            this.updater((state, update) => {
                const nextState = {...state, loading: Loading.Fulfill, tags};
                update(nextState);
            });
        });
    };
}