import {Presenter} from "../Presenter";
import {Topic} from "../../../domains/topic/Topic";
import {IFollowedTopicsInteractor} from "../../interactors/userProfile/FollowedTopicsInteractor";
import {Loading} from "../common/PresenterState";
/**
 * Created by ryota on 2017/06/25.
 */

export interface FollowedTopicsPresenterState {
    topics: Topic[],
    loading: Loading
}

export interface FollowedTopicsPresenter extends Presenter<FollowedTopicsPresenterState> {
    followTopic(topicIdNum: number): void;
    unFollowTopic(topicIdNum: number): void;
    getFollowedTopic(): void;
}

export interface FollowedTopicsViewProps extends FollowedTopicsPresenterState {
    presenter: FollowedTopicsPresenter,
}

export type FollowedTopicsViewType = (props: FollowedTopicsViewProps) => JSX.Element

export class FollowedTopicsPresenterImpl extends Presenter<FollowedTopicsPresenterState> implements FollowedTopicsPresenter {
    constructor(private interactor: IFollowedTopicsInteractor,
                view: FollowedTopicsViewType) {
        super(view);
    }

    get getInitialState() {
        return {
            topics: [],
            loading: Loading.Initial
        }
    }

    onViewAppear = () => {
        this.getFollowedTopic();
    };

    followTopic = (topicIdNum: number) => {
        const useCase = this.interactor.followTopic(topicIdNum);
        useCase.onResult(topicId => {
            this.updater((state, update) => {
                const topics = state.topics.map(topic => {
                    if (topic.id.equals(topicId)) {
                        const updatedTopic = Topic.factory({...topic, followed: true});
                        if (updatedTopic instanceof Topic) {
                            return updatedTopic;
                        } else {
                            throw new Error(updatedTopic.reason);
                        }
                    }
                    return topic;
                });

                update({...state, topics});
            });
        });
    };
    unFollowTopic = (topicIdNum: number) => {
        const useCase = this.interactor.followTopic(topicIdNum);
        useCase.onResult(topicId => {
            this.updater((state, update) => {
                const topics = state.topics.map(topic => {
                    if (topic.id.equals(topicId)) {
                        const updatedTopic = Topic.factory({...topic, followed: false});
                        if (updatedTopic instanceof Topic) {
                            return updatedTopic;
                        } else {
                            throw new Error(updatedTopic.reason);
                        }
                    }
                    return topic;
                });

                update({...state, topics});
            });
        });
    };

    getFollowedTopic = () => {
        const useCase = this.interactor.getFollowedTopic();
        useCase.onResult((topics) => {
            this.updater((state, update) => {
                update({...state, topics});
            });
        });
    };
}