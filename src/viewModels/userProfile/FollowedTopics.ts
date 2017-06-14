import {Loading, ViewModel} from "../ViewModel";
import {Topic} from "../../domains/topic/Topic";
import {UseCase} from "../../usecases/UseCase";
import {UserFollowTopicUseCase} from "../../usecases/UserFollowTopicUseCase";
import {UserRepository} from "../../domains/user/UserRepository";
import {TopicReadRepository} from "../../domains/topic/TopicRepository";
import {UserUnFollowTopicUseCase} from "../../usecases/UserUnFollowTopicUseCase";
import {GetUserFollowTopics} from "../../usecases/GetUserFollowTopicsUseCase";
/**
 * Created by ryota on 2017/06/10.
 */

export abstract class FollowedTopics extends ViewModel {
    abstract topicRepository: TopicReadRepository;
    abstract userRepository: UserRepository;
    abstract userId: number;
    topics: Topic[] = [];
    loading: Loading = Loading.Initial;
    followTopic = (topicIdNum: number) => {
        const useCase = new UserFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.topics.map(topic => {
                if (topic.id.equals(updatedTopicId)) {
                    return Topic.factory({...topic, followed: true});
                }
                return topic;
            });
        });
    };

    unFollowTopic = (topicIdNum: number) => {
        const useCase = new UserUnFollowTopicUseCase(this.topicRepository, this.userRepository);
        UseCase.execute({userId: this.userId, topicId: topicIdNum} ,useCase);
        useCase.onResult(updatedTopicId => {
            this.topics.map(topic => {
                if (topic.id.equals(updatedTopicId)) {
                    return Topic.factory({...topic, followed: true});
                }
                return topic;
            });
        });
    };

    getFollowedTopics = () => {
        console.log("getTopics");
        const useCase = new GetUserFollowTopics(this.topicRepository, this.userRepository);
        UseCase.execute({userId:this.userId} ,useCase);
        useCase.onStart(() => {
            this.loading = Loading.Initial;
            this.viewUpdate()
        });

        useCase.onResult(topics => {
            console.log(topics)
            this.topics = topics;
            this.loading = Loading.Fulfill;
            this.viewUpdate();
        });
    }
}