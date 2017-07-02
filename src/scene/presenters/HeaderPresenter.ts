import {Presenter} from "./Presenter";
import {SyncleRouter} from "../../routing/Router";
/**
 * Created by ryota on 2017/06/25.
 */
export interface IHeaderPresenter extends Presenter<{}> {
    transitionCreateTopic: () => void
    transitionUserFollowTopics: () => void
    transitionUserLoveTags: () => void;
    transitionUserCreatedTopics: () => void;
}

export type HeaderPresenterViewProps = {
    presenter: IHeaderPresenter
}
export type HeaderViewType = (props: HeaderPresenterViewProps) => JSX.Element;

export class HeaderPresenter extends Presenter<{}> implements  IHeaderPresenter {
    constructor(
        private syncleRouter: SyncleRouter,
        view: HeaderViewType) {
        super(view);
    }

    get getInitialState() {
        return {};
    }

    transitionCreateTopic() {
        this.syncleRouter.moveCreateTopic()
    }

    transitionUserFollowTopics() {
        this.syncleRouter.moveFollowTopics()
    }

    transitionUserLoveTags() {
        this.syncleRouter.moveLoveTags()
    }

    transitionUserCreatedTopics() {
        this.syncleRouter.moveCreatedTopics()
    }

    transitionPrevScene() {
        this.syncleRouter.goBack();
    }
}