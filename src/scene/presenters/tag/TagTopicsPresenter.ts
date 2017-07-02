import {Presenter} from "../Presenter";
import {Topic} from "../../../domains/topic/Topic";
import {Tag} from "../../../domains/tag/Tag";
import {TagTopicsInteractor} from "../../interactors/tag/TagTopicsInteractor";
/**
 * Created by ryota on 2017/06/25.
 */

export interface TagTopicsPresenterState {
    topics: Topic[],
    tag: Tag | null
}


export interface ITagTopicsPresenter {
    getTagTopics: () => void;
}

export interface TagTopicsPresenterViewProps extends TagTopicsPresenterState {
    presenter: ITagTopicsPresenter
}

export type TagTopicsViewType = (props: TagTopicsPresenterViewProps) => JSX.Element


export class TagTopicsPresenter extends Presenter<TagTopicsPresenterState> {
    constructor(private tag: Tag,
                public interactor: TagTopicsInteractor,
                view: (props: TagTopicsPresenterState) => JSX.Element) {
        super(view);
        this.updater((state, update) => {
            update({...state, tag});
        });
    }

    onViewAppear = () => {
      this.getTagTopics();
    };

    getTagTopics = () => {
        this.interactor.getTagTopics(this.tag.id).onResult(
            topics => this.updater((state, update) => update({...state, topics}))
        );
    };

    get getInitialState() {
        return {
            tag: null,
            topics: []
        }
    }
}