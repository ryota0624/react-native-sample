import {Loading, ViewModel, ViewStateModel} from "../ViewModel";
import {Topic} from "../../domains/topic/Topic";
import {UseCase} from "../../usecases/UseCase";
import {UserUnFollowTopicUseCase} from "../../usecases/UserUnFollowTopicUseCase";
import {UserFollowTopicUseCase} from "../../usecases/UserFollowTopicUseCase";
import {TopicReadRepository, TopicWriteRepository} from "../../domains/topic/TopicRepository";
import {UserRepository} from "../../domains/user/UserRepository";
import {TagRepository} from "../../domains/tag/TagRepository";
import {GetTagTopicsUseCase, GetTagTopicsUseCaseArgs} from "../../usecases/GetTagTopicsUseCase";
import {TagName} from "../../domains/tag/Tag";
/**
 * Created by ryota on 2017/06/14.
 */

export interface TagTopicsState {
    tagName: TagName
    topics: Topic[],
    loading: Loading
}

export interface TagTopicsActions {
    followTopic: (topicIdNum: number) => void,
    unFollowTopic: (topicIdNum: number) => void
}

export abstract class TagTopics extends ViewStateModel<TagTopicsState, TagTopicsActions> implements TagTopicsActions {
    abstract tagRepository: TagRepository;
    abstract userRepository: UserRepository;
    abstract topicReadRepository: TopicReadRepository;
    abstract userId: number;

    constructor(private tagName: TagName) {
        super();
    }

    get initialState() {
        return {
            tagName: this.tagName,
            topics: [],
            loading: Loading.Initial,
        }
    }

    get viewActions() {
        return {
            followTopic: this.followTopic,
            unFollowTopic: this.unFollowTopic
        }
    }

    getTagTopics = () => {
      const useCase = new GetTagTopicsUseCase(this.topicReadRepository);
      UseCase.executeR<GetTagTopicsUseCaseArgs ,Topic[]>(useCase, {tagName: this.tagName});
      useCase.onResult(topics => {
         this.updater((state, update) => {
           update({...state, topics});
         });
      });
    };

    followTopic = (topicIdNum: number) => {
        const useCase = new UserFollowTopicUseCase(this.topicReadRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.updater((state, update) => {
                const topics: Topic[] = state.topics.map(topic => {
                    if (topic.id.equals(updatedTopicId)) {
                        const updatedTopic = Topic.factory({...topic, followed: true});
                        if (updatedTopic instanceof Topic) {
                            return updatedTopic;
                        } else {
                            throw new Error(`invalid topic ${updatedTopic}`);
                        }
                    }
                    return topic;
                });
                update({...state, topics});
            });
        });
    };

    unFollowTopic = (topicIdNum: number) => {
        const useCase = new UserUnFollowTopicUseCase(this.topicReadRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.updater((state, update) => {
                const topics: Topic[] = state.topics.map(topic => {
                    if (topic.id.equals(updatedTopicId)) {
                        const updatedTopic = Topic.factory({...topic, followed: false});
                        if (updatedTopic instanceof Topic) {
                            return updatedTopic;
                        } else {
                            throw new Error(`invalid topic ${updatedTopic}`);
                        }
                    }
                    return topic;
                });
                update({...state, topics});
            });
        });
    };

}