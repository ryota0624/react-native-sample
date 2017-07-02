/**
 * Created by ryota on 2017/06/25.
 */
import {Presenter} from "../Presenter";
import {Topic} from "../../../domains/topic/Topic";
import {ICreatedTopicsInteractor} from "../../interactors/userProfile/CreatedTopicsInteractor";
import {Loading} from "../common/PresenterState";
/**
 * Created by ryota on 2017/06/25.
 */

export interface CreatedTopicsPresenterState {
    topics: Topic[],
    loading: Loading
}

export interface CreatedTopicsPresenter extends Presenter<CreatedTopicsPresenterState> {
    followTopic(topicIdNum: number): void;
    unFollowTopic(topicIdNum: number): void;
    getCreatedTopic(): void;
}

export interface CreatedTopicsViewProps extends CreatedTopicsPresenterState {
    presenter: CreatedTopicsPresenter,
}

export type CreatedTopicsViewType = (props: CreatedTopicsViewProps) => JSX.Element

export class CreatedTopicsPresenterImpl extends Presenter<CreatedTopicsPresenterState> implements CreatedTopicsPresenter {
    constructor(private interactor: ICreatedTopicsInteractor,
                view: CreatedTopicsViewType) {
        super(view);
    }

    get getInitialState() {
        return {
            topics: [],
            loading: Loading.Initial,
        }
    }

    onViewAppear = () => {
      this.getCreatedTopic();
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

    getCreatedTopic = () => {
        const useCase = this.interactor.getCreatedTopic();
        useCase.onResult((topics) => {
            this.updater((state, update) => {
                update({...state, topics});
            });
        });
    };
}