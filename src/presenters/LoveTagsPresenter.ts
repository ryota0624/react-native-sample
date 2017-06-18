import {Tag, TagName} from "../domains/tag/Tag";
import {SynclePage, SyncleRouter} from "../routing/SyncleRouter";
import {Presenter} from "./Presenter";
import {LoveTagsInteractor} from "../interactors/LoveTagsInteractor";

/**
 * Created by ryota on 2017/06/18.
 */
export interface LoveTagsPresenter extends Presenter<{ tags: Tag[] }> {
    transitionToTagTopics(tagName: TagName): void;
    changeLoveLevel(tagName: TagName): void
}

export interface LoveTagsViewProps {
    presenter: LoveTagsPresenter,
    tags: Tag[]
}

export type LoveTagsViewType = (props: LoveTagsViewProps) => JSX.Element

export class LoveTagsPresenterImpl extends Presenter<{ tags: Tag[] }> implements LoveTagsPresenter {
    constructor(private syncleRouter: SyncleRouter,
                private loveTagsInteractor: LoveTagsInteractor,
                view: LoveTagsViewType,) {
        super(view);
    }

    getLoveTags() {
        const useCase = this.loveTagsInteractor.getLoveTags();
        useCase.onResult(tags => {
            this.updater((state, update) => {
                update({...state, tags});
            });
        })
    }

    get getInitialState() {
        return {
            tags: []
        }
    }

    transitionToTagTopics = (tagName: TagName) => {
        this.syncleRouter.render(SynclePage.TagTopics, tagName);
    };

    changeLoveLevel = (tagName: TagName) => {
        this.loveTagsInteractor.changeLoveLevel(tagName)
            .onLoveLevel((loveLevelUpdatedTag: Tag) => {
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

    onViewAppear = () => {
        this.getLoveTags();
    }

}
